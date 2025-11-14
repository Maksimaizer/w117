import { BuildOptions } from "../types/type";
import webpack from 'webpack';
import { BuildDevServer } from "./BuildDevServer";
import { BuildResolve } from "./BuildResolve";
import { buildLoader } from "./BuildLoader";
import { buildPlugin } from "./BuildPlugin";


export function BuildWebpack(options: BuildOptions): webpack.Configuration {

     const {mode, paths} = options;
     const isDev = mode === "development";

    return {
          mode: mode ?? "development",
          entry: paths.entry,
          output: {
          path: paths.output,
          filename: '[name].[contenthash].js',
          clean: true
          },
          devtool: isDev && 'inline-source-map',
          plugins: buildPlugin(options),
            module: {
               rules: buildLoader(options),
               },
               resolve: BuildResolve(options),
           devServer: isDev ? BuildDevServer(options) : undefined
     }
}