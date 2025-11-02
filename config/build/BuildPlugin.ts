import { Configuration } from "webpack";
import { BuildOptions } from "../types/type";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";






export function buildPlugin({paths, mode}: BuildOptions): Configuration["plugins"] {

      const isDev = mode === "development";

     const plugin: Configuration["plugins"] = [
          new HtmlWebpackPlugin({template: paths.html}),
     ] 


     if(isDev) plugin.push(new ForkTsCheckerWebpackPlugin());


     if(!isDev) {
          plugin.push(
             new MiniCssExtractPlugin({
               filename: 'css/[name].[contenthash].css',
               chunkFilename: 'css/[name].[contenthash].css',
              })
          )
          }

     return plugin;
                    
               
}