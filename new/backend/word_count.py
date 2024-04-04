def count_words(text):
    # Split the text into words using whitespace as a delimiter
    words = text.split()
    # Return the count of words
    wordCount = len(words)
    # print(f"Number of words: {len(words)}")
    return wordCount

# Example usage:
# input_text = "This is a sample text for word count."
# result = count_words(input_text)
# print(f"Number of words: {result}")
