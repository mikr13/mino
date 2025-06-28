import type { editor, IPosition, IRange } from 'monaco-editor';
import type { ReadonlyRange } from '../types';

type MonacoRange = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

/**
 * Convert ReadonlyRange array to Monaco range format
 */
export function convertReadonlyRangesToMonaco(
  ranges: ReadonlyRange[]
): MonacoRange[] {
  return ranges.map((range) => ({
    startLineNumber: range.startLine,
    startColumn: range.startColumn || 1,
    endLineNumber: range.endLine,
    endColumn: range.endColumn || Number.MAX_SAFE_INTEGER,
  }));
}

/**
 * Convert a single ReadonlyRange to Monaco IRange
 */
function convertToMonacoRange(
  range: ReadonlyRange,
  model: editor.ITextModel
): IRange {
  return {
    startLineNumber: range.startLine,
    startColumn: range.startColumn || 1,
    endLineNumber: range.endLine,
    endColumn: range.endColumn || model.getLineMaxColumn(range.endLine),
  };
}

/**
 * Check if a position is within any readonly range
 */
export function isPositionInReadonlyRange(
  position: { lineNumber: number; column: number },
  readonlyRanges: ReadonlyRange[]
): boolean {
  return readonlyRanges.some((range) => {
    return (
      position.lineNumber >= range.startLine &&
      position.lineNumber <= range.endLine &&
      position.column >= (range.startColumn || 1) &&
      position.column <= (range.endColumn || Number.MAX_SAFE_INTEGER)
    );
  });
}

/**
 * Check if a range overlaps with any readonly range
 */
export function isRangeInReadonlyArea(
  range: MonacoRange,
  readonlyRanges: MonacoRange[]
): boolean {
  return readonlyRanges.some((readonlyRange) => {
    // Check if ranges overlap
    return !(
      range.endLineNumber < readonlyRange.startLineNumber ||
      range.startLineNumber > readonlyRange.endLineNumber ||
      (range.endLineNumber === readonlyRange.startLineNumber &&
        range.endColumn < readonlyRange.startColumn) ||
      (range.startLineNumber === readonlyRange.endLineNumber &&
        range.startColumn > readonlyRange.endColumn)
    );
  });
}

/**
 * Filter out changes that would affect readonly ranges
 */
export function filterReadonlyChanges(
  changes: editor.IModelContentChange[],
  readonlyRanges: ReadonlyRange[]
): editor.IModelContentChange[] {
  return changes.filter((change) => {
    const range = change.range;
    return !readonlyRanges.some((readonlyRange) => {
      // Check if the change overlaps with any readonly range
      return !(
        range.endLineNumber < readonlyRange.startLine ||
        range.startLineNumber > readonlyRange.endLine ||
        (range.endLineNumber === readonlyRange.startLine &&
          range.endColumn < (readonlyRange.startColumn || 1)) ||
        (range.startLineNumber === readonlyRange.endLine &&
          range.startColumn >
            (readonlyRange.endColumn || Number.MAX_SAFE_INTEGER))
      );
    });
  });
}

/**
 * Setup readonly decorations for Monaco editor using the new API
 */
export function setupReadonlyDecorations(
  editorInstance: editor.IStandaloneCodeEditor,
  ranges: ReadonlyRange[]
): editor.IEditorDecorationsCollection {
  const monacoRanges = convertReadonlyRangesToMonaco(ranges);

  const decorations = monacoRanges.map((range) => ({
    range,
    options: {
      className: 'readonly-range',
      glyphMarginClassName: 'readonly-glyph',
      hoverMessage: { value: 'This section is read-only' },
      stickiness: 1, // TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
    },
  }));

  return editorInstance.createDecorationsCollection(decorations);
}

/**
 * Remove readonly decorations from Monaco editor
 */
export function removeReadonlyDecorations(
  decorationsCollection: editor.IEditorDecorationsCollection
): void {
  decorationsCollection.clear();
}

/**
 * Setup readonly ranges for a Monaco editor instance
 */
export function setupReadonlyRanges(
  editorInstance: editor.IStandaloneCodeEditor,
  monaco: typeof import('monaco-editor'),
  readonlyRanges: ReadonlyRange[]
): () => void {
  const model = editorInstance.getModel();
  if (!model || readonlyRanges.length === 0) {
    // Return empty cleanup function
    return () => {
      // No cleanup needed
    };
  }

  // Convert readonly ranges to Monaco decorations
  const decorations = readonlyRanges.map((range) => ({
    range: convertToMonacoRange(range, model),
    options: {
      className: 'readonly-range',
      isWholeLine: false,
      stickiness:
        monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
      hoverMessage: { value: 'This code is protected and cannot be edited' },
      minimap: {
        color: '#fbbf24',
        position: monaco.editor.MinimapPosition.Inline,
      },
    },
  }));

  // Apply decorations using the new API
  const decorationsCollection =
    editorInstance.createDecorationsCollection(decorations);

  // Prevent editing in readonly ranges
  const disposables: Array<{ dispose(): void }> = [];

  // Block cursor movement into readonly ranges
  disposables.push(
    editorInstance.onDidChangeCursorPosition(
      (e: editor.ICursorPositionChangedEvent) => {
        if (isPositionInReadonlyRange(e.position, readonlyRanges)) {
          // Find the nearest valid position
          const nearestPosition = findNearestValidPosition(
            e.position,
            readonlyRanges,
            model
          );
          if (nearestPosition) {
            editorInstance.setPosition(nearestPosition);
          }
        }
      }
    )
  );

  // Block content changes in readonly ranges
  disposables.push(
    editorInstance.onDidChangeModelContent(
      (e: editor.IModelContentChangedEvent) => {
        const hasReadonlyChanges = e.changes.some(
          (change: editor.IModelContentChange) =>
            readonlyRanges.some((range) => {
              const changeRange = change.range;
              return !(
                changeRange.endLineNumber < range.startLine ||
                changeRange.startLineNumber > range.endLine
              );
            })
        );

        if (hasReadonlyChanges) {
          // Prevent the change by undoing it
          editorInstance.trigger('readonly', 'undo', null);
        }
      }
    )
  );

  // Return cleanup function
  return () => {
    decorationsCollection.clear();
    for (const disposable of disposables) {
      disposable.dispose();
    }
  };
}

/**
 * Find the nearest valid cursor position outside readonly ranges
 */
function findNearestValidPosition(
  position: IPosition,
  readonlyRanges: ReadonlyRange[],
  model: editor.ITextModel
): IPosition | null {
  // Try to find a position immediately before or after the readonly range
  for (const range of readonlyRanges) {
    if (
      position.lineNumber >= range.startLine &&
      position.lineNumber <= range.endLine
    ) {
      // Try moving to the line before the readonly range
      if (range.startLine > 1) {
        return {
          lineNumber: range.startLine - 1,
          column: model.getLineMaxColumn(range.startLine - 1),
        };
      }

      // Try moving to the line after the readonly range
      if (range.endLine < model.getLineCount()) {
        return {
          lineNumber: range.endLine + 1,
          column: 1,
        };
      }
    }
  }

  // Fallback to the beginning or end of the document
  return { lineNumber: 1, column: 1 };
}
