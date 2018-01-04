const WHITESPACE = "__WSPACE__"
const COMMENT = "__COMMENT__"

class Grammar {

    constructor(caseSensitive=true, wsChars=[" ", "\t", "\r", "\n"]) {

        this._patterns = []
        this._caseSensitive = caseSensitive
        this._setWsChars(wsChars)

    }

    _setWsChars(wsChars) {
        this._wsPattern = "[" + wsChars.join("") + "]"
        this.addToken(WHITESPACE, this._wsPattern)
    }
    
    getTokenPatterns() {
        return this._patterns
    }

    addToken(name, pattern) {
        this._patterns.push([name, new RegExp("^(" + pattern  + ")")])
        return this
    }

    addKeyword(keyword, name="") {

        let name_ = name || keyword.toUpperCase()
        let kw = ""

        if (this._caseSensitive) {
            kw = keyword
        } else {
            for (let i=0; i<keyword.length; i++) {
                let ch = keyword.charAt(i)
                kw += `(${ch.toLowerCase()}|${ch.toUpperCase()})`
            }
        }

        let pattern = "^(" +  kw + ")(?:" + this._wsPattern + "|\Z)"
        this._patterns.unshift([name_, new RegExp(pattern)])

        return this
    }

}

module.exports = Grammar