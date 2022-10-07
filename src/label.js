/**
 * Check todo has label
 *
 * @param {string} text
 * @returns {boolean}
 */
export function has_label(text) {
    return text.startsWith("@");
}

/**
 * Simple todo label
 * @typedef {Object} Label
 * @property {number} level
 * @property {string} text
 */

/**
 * Parse labels from todo text(markdown)
 *
 * @param {string} text
 * @returns {Label[]} labels
 */
export function parse_labels(text) {
    let labels = [];

    if (text.startsWith("@")) {
        text.split("\n")[0]
            .split(",")
            .forEach((label) => {
                label = label.trim();

                let level = label.split("").filter((x) => x == "@").length;
                let text = label.slice(level, label.length).trim();

                if (level < 1) {
                    level = 1;
                } else if (level > 3) {
                    level = 3;
                }

                if (text.length != 0) {
                    labels.push({
                        level,
                        text,
                    });
                }
            });
    }

    return labels;
}

/**
 * Remove label from text
 *
 * @param {string} text
 * @returns {string} text
 */
export function remove_label(text) {
    if (!has_label(text)) {
        return text;
    }

    return text.split("\n").slice(1).join("\n");
}