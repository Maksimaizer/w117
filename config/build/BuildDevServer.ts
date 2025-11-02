import { BuildOptions } from "../types/type";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";





export function BuildDevServer(options: BuildOptions): DevServerConfiguration  {
     return {
        open: true,
        port: 3000,
        historyApiFallback: true,
        static: "./public",
     proxy: [
        {
            context: ['/api'], // ← куда перехватывать запросы
            target: 'http://localhost:5000',
            changeOrigin: true,
        }
        ],
    };
}
