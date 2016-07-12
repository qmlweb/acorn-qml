function check(st, regex) {
  return regex.test(st.input.slice(st.start));
}

function peek(st, regex) {
  return regex.test(st.input.slice(st.end));
}

module.exports = (parser, configValue) => {
  parser.extend("readToken", nextMethod => {
    return function(code) {
      //console.log("Reading a token!", code)
      return nextMethod.call(this, code)
    };
  });
  parser.extend("parseStatement",function(base){
    return function (declaration, topLevel) {
      const out = { start: this.start };
      const startLoc = this.startLoc;
      const proceed = type => {
        var r = this.parseStatement(declaration, topLevel) ;
        r.type = type;
        for (let i in out) {
          r[i] = out[i];
        }
        if (r.loc) r.loc.start = startLoc;
        return r;
      };

      if (this.type.label === "name") {
        if (peek(this, /^\s+{/)) {
          // QmlElement: `Something {`
          out.name = this.value;
          this.next();
          return proceed("QmlElement");
        } else if (check(this, /^(default\s+|readonly\s+|)property\s+/)) {
          // QmlProperty: `(default|readonly) property $type $name`
          out.default = this.value === "default";
          out.readonly = this.value === "readonly";
          if (out.default || out.readonly) {
            this.next();
          }
          if (this.value !== 'property') {
            // TODO: error
          }
          this.next();
          out.proptype = this.value;
          this.next();
          return proceed("QmlProperty");
        }
      }

      return base.apply(this, arguments);
    }
  });
};
