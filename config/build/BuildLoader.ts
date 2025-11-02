import { ModuleOptions } from "webpack";
import { BuildOptions } from "../types/type";
import MiniCssExtractPlugin from "mini-css-extract-plugin";







export function buildLoader(options: BuildOptions): ModuleOptions["rules"] {

               const isDev = options.mode === "development";
               
               const assetsLoader = {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    }


               const cssWithModules =  {
                    loader: "css-loader",
                    options: {
                         modules: {
                              localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
                         }
                    },
                    };

                const sassLoader =  {
                    test: /\.s[ac]ss$/i,
                    use: [
                         // Creates `style` nodes from JS strings
                         !isDev ? MiniCssExtractPlugin.loader : "style-loader",
                         // Translates CSS into CommonJS
                         cssWithModules,
                         // Compiles Sass to CSS
                         "sass-loader",
                    ],
                    };

                   const tsLoader = {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                    };

               return [assetsLoader, sassLoader, tsLoader];
               
}