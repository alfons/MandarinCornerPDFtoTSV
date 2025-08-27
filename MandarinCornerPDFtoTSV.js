/**
 * A class to convert MandarinCorner PDF text into TSV format for spreadsheet use.
 */
class MandarinCornerPDFtoTSV {
    /**
     * Creates an instance of MandarinCornerPDFtoTSV.
     * @param {Object} [options={}] - Configuration options.
     * @param {HTMLElement} [options.inputElement] - Textarea for input text.
     * @param {HTMLElement} [options.outputElement] - Textarea for TSV output.
     * @param {HTMLElement} [options.copyButtonElement] - Button for copying output.
     * @param {HTMLElement} [options.errorElement] - Element for displaying errors.
     */
    constructor(options = {}) {
        this.inputElement = options.inputElement || null;
        this.outputElement = options.outputElement || null;
        this.copyButtonElement = options.copyButtonElement || null;
        this.errorElement = options.errorElement || null;
        this.errors = [];
        
        this.initialize();
    }

    /**
     * Initializes event listeners for input and copy button if DOM elements are provided.
     */
    initialize() {
        if (this.inputElement) {
            this.inputElement.addEventListener('input', () => {
                const tsv = this.convertToTSV(this.inputElement.value);
                if (this.outputElement) {
                    this.outputElement.value = tsv;
                }
                this.updateButtonState();
                this.displayErrors();
            });
        }

        if (this.copyButtonElement) {
            this.copyButtonElement.addEventListener('click', () => this.copyToClipboard());
        }
    }

    /**
     * Converts raw PDF text to TSV format.
     * @param {string} text - The raw text from the PDF.
     * @returns {string} - The TSV-formatted string.
     */
    convertToTSV(text) {
        this.errors = [];

        // Preprocess input: split lines, trim, filter empty, normalize quotes
        const lines = text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => line.replace(/^"|"$/g, ''));

        const result = [];
        const lineFrequency = {};

        // Identify frequently occurring lines (potential disturbances)
        lines.forEach(line => {
            lineFrequency[line] = (lineFrequency[line] || 0) + 1;
        });
        const frequentLines = new Set(Object.keys(lineFrequency).filter(line => lineFrequency[line] > 3));

        let i = 0;
        while (i < lines.length) {
            const line = lines[i];

            // Check if the line is an index number (strictly digits)
            if (/^\d+$/.test(line)) {
                const index = line;
                const content = [];
                let j = i + 1;

                // Collect exactly 3 content lines or stop at next index
                while (j < lines.length && content.length < 3 && !/^\d+$/.test(lines[j])) {
                    const nextLine = lines[j];

                    // Skip disturbance lines
                    if (nextLine.includes('mandarincorner.org') || frequentLines.has(nextLine)) {
                        this.errors.push(`Index ${index}: Skipping disturbance line: "${nextLine}"`);
                        j++;
                        continue;
                    }

                    content.push(nextLine);
                    j++;
                }

                // Process content: expect exactly 3 lines (pinyin, chinese, english)
                if (content.length === 3) {
                    const [pinyin, chinese, english] = content;
                    result.push(`${index}\t${pinyin}\t${chinese}\t${english}`);
                } else {
                    this.errors.push(`Index ${index}: Expected 3 content lines, got ${content.length}`);
                }

                // Move to the next index
                i = j;
            } else {
                this.errors.push(`Skipping non-index line: "${line}"`);
                i++;
            }
        }

        return result.join('\n');
    }

    /**
     * Updates the state of the copy button based on output content.
     */
    updateButtonState() {
        if (this.copyButtonElement && this.outputElement) {
            if (this.outputElement.value.trim().length > 0) {
                this.copyButtonElement.disabled = false;
                this.copyButtonElement.classList.add('enabled');
            } else {
                this.copyButtonElement.disabled = true;
                this.copyButtonElement.classList.remove('enabled', 'copied');
            }
        }
    }

    /**
     * Copies the output text to the clipboard and updates button state.
     */
    copyToClipboard() {
        if (this.copyButtonElement && this.outputElement && !this.copyButtonElement.disabled) {
            try {
                navigator.clipboard.writeText(this.outputElement.value).then(() => {
                    this.copyButtonElement.classList.add('copied');
                    this.copyButtonElement.textContent = 'Copied!';
                    setTimeout(() => {
                        this.copyButtonElement.textContent = 'Copy to Clipboard';
                        this.copyButtonElement.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    this.errors.push('Failed to copy to clipboard');
                    this.displayErrors();
                });
            } catch (err) {
                this.errors.push('Failed to copy to clipboard');
                this.displayErrors();
            }
        }
    }

    /**
     * Displays errors in the error element, limited to 10 errors.
     */
    displayErrors() {
        if (this.errorElement) {
            this.errorElement.textContent = this.errors.length > 0
                ? this.errors.slice(0, 10).join('\n') + (this.errors.length > 10 ? `\n...and ${this.errors.length - 10} more errors` : '')
                : 'No errors detected.';
        }
    }
}
