


export interface BuildPaths {
     html: string,
     entry: string,
     output: string,
     src: string
}


export type BuildMode = 'development' | 'production';


export interface BuildOptions {
     mode: BuildMode,
     paths: BuildPaths,
     port: number
}