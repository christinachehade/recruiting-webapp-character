export function meetsRequirements(attributes, minimumRequirements) {
    for (const attribute of attributes) {
        if (attribute.value < minimumRequirements[attribute.name]) {
            return false;
        }
    }
    return true;
}

export function getModifier(value) {
    const modifier = (value - 10) / 2;
    return value % 2 === 0 ? modifier : modifier - 0.5;
}
