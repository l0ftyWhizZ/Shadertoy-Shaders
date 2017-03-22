float dist (vec3 d) {
    vec3 e = fract(d) * 2.0 - 1.0;
	return length(e) - 0.4;
}

float rayMarch(vec3 origin, vec3 ray) {
    float t = 0.0;
    for (int i = 0; i < 64; i++) {
    	vec3 p = origin + ray * 2.0 * t;
        float d = dist(p);
        t += d * 0.5;
    }
	return t;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    uv = uv * 2.0 - 1.0;
	uv.x *= iResolution.x/iResolution.y;
    uv.xy *= 6.0 * sin(iGlobalTime);
    vec3 ray = normalize(vec3(uv,1.0));
    vec3 origin = vec3(0.0, 0.0, iGlobalTime);
    float march = rayMarch(origin, ray);
    float fog = 1.0/(1.0 + march*march*0.1);
    vec3 finalColor = vec3(fog/0.66, fog/0.33, fog/0.22);
    fragColor = vec4(finalColor,1.0);
}
