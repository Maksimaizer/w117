import path from 'path';
import webpack from 'webpack';
import { BuildMode, BuildPaths } from './config/types/type';
import { BuildWebpack } from './config/build/BuildWebpack';


type Env = {
     mode: BuildMode;
     port: number,
};

export default (env: Env) => {

     const isDev = env.mode === "development";

     const paths: BuildPaths = {
          entry: path.resolve(__dirname, 'src', 'index.tsx'),
          html: path.resolve(__dirname, 'public', 'index.html'),
          output: path.resolve(__dirname, 'bundle'),
          src: path.resolve(__dirname, "src")
     }

     const config: webpack.Configuration = BuildWebpack({
          paths,
          port: env.port ?? 3000,
          mode: env.mode ?? "development",
     });
     return config;
}