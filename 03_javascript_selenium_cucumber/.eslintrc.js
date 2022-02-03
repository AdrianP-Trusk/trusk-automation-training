module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true,
        "node": true,
    },
    "extends": [
        "google",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
    },
    "plugins": [
        "cucumber",
        "jest",
    ],
    "rules": {
        "indent": ["error", 4],
        "max-len": [
            "error",
            {
                "code": 300,
            },
        ],
        "new-cap": "off",
        "quotes": ["error", "double"],
        "semi": ["error", "never"],
    },
}
