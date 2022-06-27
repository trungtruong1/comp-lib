import resolve from "@rollup/plugin-node-resolve"; 
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");  //use this variable to refer to the main and module values

//rollup config exports an array of configurations objects 
//(2 configurations object: 1 export js files with all components, 
//2: export the types (.d .ts) files that describles types of components)

export default [
    { 
      input: "src/index.ts", //take all exported components 
      output: [
        {
          file: packageJson.main, //common js modules 
          format: "cjs",
          sourcemap: true, 
        },
        {
          file: packageJson.module, 
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }), //have to do 
      ],
    }, //first element
    {
      input: "dist/esm/types/index.d.ts",
      output: [{ file: "dist/index.d.ts", format: "esm" }],
      plugins: [dts()],
    }, //second element 
  ];