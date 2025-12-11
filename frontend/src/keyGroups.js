const keyGroups = [
  ["q", "a", "z", "1", "!", "`", "~", "Tab", "CapsLock", "Shift", "Ctrl"],   
  ["w", "s", "x", "2", "@"],                                                 
  ["e", "d", "c", "3", "#"],                                                
  ["r", "f", "v", "t", "g", "b", "4", "5", "$", "%"],                       
  ["y", "h", "n", "u", "j", "m", "6", "7", "^", "&"],                       
  ["i", "k", ",", "8", "*"],                                                
  ["o", "l", ".", "9", "("],                                              
  ["p", ";", "/", "-", "=", "[", "]", "\\", "0", ")", "_", "+", "Enter", "Backspace", "Shift", "Ctrl", "Alt"], // g8
  ["Alt", " "]                                                                
];
const keyDict = {
  // Letters
  "a": 0, "b": 0, "c": 0, "d": 0, "e": 0, "f": 0, "g": 0, "h": 0, "i": 0, "j": 0,
  "k": 0, "l": 0, "m": 0, "n": 0, "o": 0, "p": 0, "q": 0, "r": 0, "s": 0, "t": 0,
  "u": 0, "v": 0, "w": 0, "x": 0, "y": 0, "z": 0,

  // Numbers
  "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0,

  // Symbols
  "!": 0, "@": 0, "#": 0, "$": 0, "%": 0, "^": 0, "&": 0, "*": 0, "(": 0, ")": 0,
  "-": 0, "_": 0, "=": 0, "+": 0, "`": 0, "~": 0, "[": 0, "]": 0, "\\": 0,
  ";": 0, "'": 0, ",": 0, ".": 0, "/": 0,

  // Special keys
  "Tab": 0, "CapsLock": 0, "Shift": 0, "Ctrl": 0,
  "Alt": 0, "Enter": 0, "Backspace": 0, " ": 0
};

const groupNames = [
  "left_pinky",
  "left_ring",
  "left_middle",
  "left_index",
  "right_index",
  "right_middle",
  "right_ring",
  "right_pinky",
  "thumbs"
];

const getKeyGroupName = (key) => {
  for (let i = 0; i < keyGroups.length; i++) {
    if (keyGroups[i].includes(key)) return groupNames[i];
  }
  return null; 
};
const getKeyGroupNum = (key) => {
  for (let i = 0; i < keyGroups.length; i++) {
    if (keyGroups[i].includes(key)) return i;
  }
  return null; 
};
export { keyGroups, groupNames, getKeyGroupName, getKeyGroupNum };
