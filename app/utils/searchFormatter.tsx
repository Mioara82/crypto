/* eslint-disable react/no-array-index-key */
//in this instance I had to use the index of characters of string as key, because I could not use the character where this may be duplicate
export const findHighlighted = (name: string, searchedValue: string) => {
  if (!searchedValue) return name;
  const searchedChars = new Set(searchedValue.toLowerCase());
  return name.split("").map((char: string, index: number) => {
    const isHighlighted = searchedChars.has(char.toLowerCase());
    return isHighlighted ? (
      <span key={index} className="text-common-cyan">
        {char}
      </span>
    ) : (
      char
    );
  });
};
