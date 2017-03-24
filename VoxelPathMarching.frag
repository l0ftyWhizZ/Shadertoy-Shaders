void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    uv.y -= .5;
	vec3 c, f, p, o, y = vec3(2.0,1.0,2.0);
    vec3 g = vec3(uv,0.5);
    g.xz *= mat2(cos(iGlobalTime),sin(iGlobalTime),-sin(iGlobalTime),cos(iGlobalTime));
    
	o.x = .01 * sin(2.0 * iGlobalTime) * cos(2.0 * iGlobalTime) - 4.4;    
	o.z = iGlobalTime * 10.0;
 	o.y = 1.2 * cos((o.z) * 0.1) - 5.0;
   
    for ( float i = 0.; i < 32.; i += .05 ) {
        o += vec3(uv,0.5) * i *.05; 
        c = o;
        f = fract(c); 
		p = floor(c) * .05;
		if( cos(p.z) + sin(p.x) > p.y + 1. ) {
	  		g = (f.y - .04 * cos((c.x + c.z) * 5.) > .5 ? y : f.x * y.yxz)/i;
            break;
        }
    }
    fragColor = vec4(g, 1.);
}