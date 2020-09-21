
export let showBlock = {
    // normal保存顶点的法线信息    invMatrix接受模型变换矩阵的逆矩阵    lightDirection接受光的方向
    // vec3  invLight = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;
    // float diffuse  = clamp(dot(normal, invLight), 0.1, 1.0);
    // vColor         = color * vec4(vec3(diffuse), 1.0);
    // 用来计算光系数
    // normalize是内置函数 作用是将向量标准化【即化为长度为1的向量
    vert: `
        attribute vec3 position;
        attribute vec4 color;
        attribute vec2 textureCoord;
        uniform   mat4 mvpMatrix;
        varying   vec4 vColor;
        varying   vec2 vTextureCoord;
        void main(void) {
            vColor = color;
            vTextureCoord  = textureCoord;
            gl_Position    = mvpMatrix * vec4(position, 1.0);
        }`,
    // fs中的vColor是vs中传进来的
    // precision指定精确度 此为精密度中的float
    frag: `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif
        uniform sampler2D texture;
        varying vec4      vColor;
        varying vec2      vTextureCoord;
        void main(void){
            vec4 smpColor = texture2D(texture, vTextureCoord);
            gl_FragColor  = vColor * smpColor;
        }`
};

export let selector = {
    vert: `
        attribute vec3 pos;
        attribute vec4 col;
        uniform   mat4 mvp;
        varying   vec4 vCol;
        void main(void) {
            vCol = col;
            gl_Position = mvp * vec4(pos, 1.0);
        }`,
    frag: `
        precision mediump float;
        varying vec4 vCol;
        void main(void) {
            gl_FragColor = vCol;
        }`
};
