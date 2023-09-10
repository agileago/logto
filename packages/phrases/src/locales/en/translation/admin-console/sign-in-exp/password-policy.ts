const password_policy = {
  password_requirements: 'Password requirements',
  minimum_length: 'Minimum length',
  minimum_length_description:
    'NIST suggests using <a>at least 8 characters</a> for web products. The maximum length is {{max}}.',
  minimum_length_error: 'Minimum length must be between {{min}} and {{max}} (inclusive).',
  minimum_required_char_types: 'Minimum required character types',
  minimum_required_char_types_description:
    'Lowercase letters (A-Z), uppercase letters (a-z), numbers (0-9), and special characters ({{symbols}}) are all.',
  password_rejection: 'Password rejection',
  compromised_passwords: 'Reject compromised password',
  breached_passwords: 'Breached passwords',
  breached_passwords_description: 'Reject passwords previously found in breach databases.',
  restricted_phrases: 'Restrict low-security phrases',
  restricted_phrases_tooltip:
    'Users cannot use passwords that are exactly the same as or made up of the listed phrases below. The addition of 3 or more non-consecutive characters is allowed to increase password complexity.',
  repetitive_or_sequential_characters: 'Repetitive or sequential characters',
  repetitive_or_sequential_characters_description: 'E.g., "AAAA", "1234", and "abcd".',
  user_information: 'User information',
  user_information_description: 'E.g., email address, phone number, username, etc.',
  custom_words: 'Custom words',
  custom_words_description:
    'Personalize context-specific words, case-insensitive, and one per line.',
  custom_words_placeholder: 'Your service name, company name, etc.',
};

export default Object.freeze(password_policy);