import{t as C,O as u}from"./desiredPostLoginRedirectUrl--AbHTvC5.js";import{i as v,W as m}from"./index-B428MuNV.js";import{b as y}from"./index-DocPcLS2.js";import"./urlSearchParams-CpA8CwXx.js";function T(a){const{issuerUri:e}=a;if(!v({issuerUri:e}))throw new Error([`oidc-spa: The issuer uri provided ${e}`,"if you are in an environnement that should support multiple","auth provider, you should first test `isKeycloakUrl({ issuerUri })`","before calling parseKeycloakIssuerUri({ issuerUri })"].join(" "));const t=new URL(e.replace(/\/$/,"")),n=t.pathname.split("/realms/");y(n.length===2);const[c,i]=n;return{origin:t.origin,realm:i,kcHttpRelativePath:c===""?void 0:c}}function $(a){const{issuerUri:e}=a,t=T({issuerUri:e}),n=`${t.origin}${t.kcHttpRelativePath??""}`,c=s=>`${n}/admin/${encodeURIComponent(s)}/console`,i=`${n}/realms/${encodeURIComponent(t.realm)}`;return{issuerUriParsed:t,adminConsoleUrl:c(t.realm),adminConsoleUrl_master:c("master"),getAccountUrl:({clientId:s,locale:r,...h})=>{const o=(()=>{const{validRedirectUri:f,backToAppFromAccountUrl:l}=h;return f!==void 0?(y(l===void 0,"getAccountUrl: backToAppFromAccountUrl is deprecated"),f):(y(l!==void 0,"getAccountUrl: Must provide validRedirectUri"),l)})(),d=new URL(`${n}/realms/${t.realm}/account`);return d.searchParams.set("referrer",s),d.searchParams.set("referrer_uri",(()=>{try{return C({urlish:o,doAssertNoQueryParams:!0,doOutputWithTrailingSlash:!0})}catch{return C({urlish:o,doAssertNoQueryParams:!1})}})()),r!==void 0&&d.searchParams.set("kc_locale",r),d.href},fetchUserProfile:({accessToken:s})=>fetch(`${i}/account`,{headers:{Accept:"application/json",Authorization:`Bearer ${s}`}}).then(r=>r.json()),fetchUserInfo:({accessToken:s})=>fetch(`${i}/protocol/openid-connect/userinfo`,{headers:{Accept:"application/json",Authorization:`Bearer ${s}`}}).then(r=>r.json()),transformUrlBeforeRedirectForRegister:s=>{const r=new URL(s);return r.pathname=r.pathname.replace(/\/auth$/,"/registrations"),r.href}}}function g(a){return fetch(a).then(async e=>{if(!e.ok)return!1;try{await e.json()}catch{return!1}return!0},()=>!1)}function R(a){const{stringWithWildcards:e,candidate:t}=a;if(!e.includes("*"))return e===t;const n=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*");return new RegExp(`^${n}$`).test(t)}async function P(a){const{issuerUri:e}=a,t=["The OIDC server is either down or the issuerUri you provided is incorrect.",`You provided the issuerUri: ${e}`,`Endpoint that couldn't be reached: ${e}${m}`].join(`
`);if(!v({issuerUri:e}))return new u({messageOrCause:[t,"","If you happen to be using Keycloak, be aware that the issuerUri you provided doesn't match the expected shape.","It should look like: https://<YOUR_KEYCLOAK_DOMAIN><KC_HTTP_RELATIVE_PATH>/realms/<YOUR_REALM>","Unless configured otherwise the KC_HTTP_RELATIVE_PATH is '/' by default on recent version of Keycloak."].join(`
`),isAuthServerLikelyDown:!0});const n=$({issuerUri:e}),c=i=>{const{kcHttpRelativePath:s}=i;return`${n.issuerUriParsed.origin}${s??""}/realms/${encodeURIComponent(n.issuerUriParsed.realm)}`};if(n.issuerUriParsed.kcHttpRelativePath===void 0){const i=c({kcHttpRelativePath:"/auth"});if(await g(`${i}${m}`))return new u({messageOrCause:["Your Keycloak server is configured with KC_HTTP_RELATIVE_PATH=/auth",`The issuerUri you provided: ${e}`,`The correct issuerUri is: ${i}`,"(You are missing the /auth portion)"].join(`
`),isAuthServerLikelyDown:!1})}else{const i=c({kcHttpRelativePath:void 0});if(await g(`${i}${m}`))return new u({messageOrCause:["Your Keycloak server is configured with KC_HTTP_RELATIVE_PATH=/",`The issuerUri you provided: ${e}`,`The correct issuerUri is: ${i}`,`(You should remove the ${n.issuerUriParsed.kcHttpRelativePath} portion.)`].join(`
`),isAuthServerLikelyDown:!1})}return new u({messageOrCause:[t,"","Given the shape of the issuerUri you provided, it seems that you are using Keycloak.",`- Make sure the realm '${n.issuerUriParsed.realm}' exists.`,"- Check the KC_HTTP_RELATIVE_PATH that you might have configured your keycloak server with.",`  For example if you have KC_HTTP_RELATIVE_PATH=/xxx the issuerUri should be ${c({kcHttpRelativePath:"/xxx"})}`].join(`
`),isAuthServerLikelyDown:!0})}async function b(a){const{redirectUri:e,issuerUri:t,clientId:n,authorizationEndpointUrl:c}=a;e:{if(await g(`${t}${m}`))break e;return P({issuerUri:t})}{const i=await fetch(e).then(r=>r.ok?{"Content-Security-Policy":r.headers.get("Content-Security-Policy"),"X-Frame-Options":r.headers.get("X-Frame-Options")}:new Error(`${e} responded with a ${r.status} status code.`),r=>r);if(i instanceof Error)return new u({isAuthServerLikelyDown:!1,messageOrCause:new Error("Unexpected error while trying to diagnose why the silent sign-in process timed out.",{cause:cspOrError})});const s=i;e:{const r=s["Content-Security-Policy"];if(r===null)break e;const h=Object.fromEntries(r.split(";").filter(o=>o!=="").map(o=>{const[d,...f]=o.split(" ");return y(d!==void 0),y(f.length!==0),[d,f]}));r:{const o=h["frame-src"];if(o===void 0||!(()=>{for(const l of o){if(l==="'none'")return!0;const p=new URL(c).origin;if(l==="'self'"&&new URL(location.href).origin===p||R({candidate:p,stringWithWildcards:l}))return!1}return!0})())break r;const f=(()=>{const l=new URL(location.href).hostname,{hostname:p,origin:k}=new URL(c);if(l===p)return"'self'";const[w,U]=l.split(".").reverse();return U&&p.endsWith(`.${U}.${w}`)?`https://*.${U}.${w}`:k})();return new u({isAuthServerLikelyDown:!1,messageOrCause:[`Session restoration via iframe failed due to the following HTTP header on GET ${e}:`,`
Content-Security-Policy “frame-src”: ${o.join("; ")}`,`
This header prevents opening an iframe to ${c}.`,`
To fix this:`,`
  - Update your CSP to: frame-src ${[...o.filter(l=>l!=="'none'"),f]}`,`
  - OR remove the frame-src directive from your CSP`,`
  - OR, if you cannot change your CSP, call bootstrapOidc/createOidc with sessionRestorationMethod: "full page redirect"`,`

More info: https://docs.oidc-spa.dev/v/v9/resources/csp-configuration`].join(" ")})}r:{const o=h["frame-ancestors"];if(o===void 0||!(o.includes("'none'")||!o.includes("'self'")))break r;return new u({isAuthServerLikelyDown:!1,messageOrCause:[`Session restoration via iframe failed due to the following HTTP header on GET ${e}:`,`
Content-Security-Policy “frame-ancestors”: ${o.join("; ")}`,`
This header prevents your app from being iframed by itself.`,`
To fix this:`,`
  - Update your CSP to: frame-ancestors 'self'`,`
  - OR remove the frame-ancestors directive from your CSP`,`
  - OR, if you cannot modify your CSP, call bootstrapOidc/createOidc with sessionRestorationMethod: "full page redirect"`,`

More info: https://docs.oidc-spa.dev/v/v9/resources/csp-configuration`].join(" ")})}}e:{const r="X-Frame-Options",h=s[r];if(h===null||!h.toLowerCase().includes("deny"))break e;return new u({isAuthServerLikelyDown:!1,messageOrCause:[`Session restoration via iframe failed due to the following HTTP header on GET ${e}:`,`
${r}: ${h}`,`
This header prevents your app from being framed by itself.`,`
To fix this, remove the ${r} header and rely on Content-Security-Policy if you need to restrict framing.`,`

More info: https://docs.oidc-spa.dev/v/v9/resources/csp-configuration`].join(" ")})}}return new u({isAuthServerLikelyDown:!1,messageOrCause:[`The silent sign-in process timed out.
`,`Based on the diagnostic performed by oidc-spa the more likely causes are:
`,`- Either the client ID "${n}" does not exist, or
`,`- You forgot to add the OIDC callback URL to the list of Valid Redirect URIs.
`,`Client ID: "${n}"
`,`Callback URL to add to the list of Valid Redirect URIs: "${e}"

`,...(()=>{if(!v({issuerUri:t}))return["Check the documentation of your OIDC server to learn how to configure the public client (Authorization Code Flow + PKCE) properly."];const i=$({issuerUri:t});return[`It seems you are using Keycloak. Follow these steps to resolve the issue:

`,`1. Go to the Keycloak admin console: ${i.adminConsoleUrl_master}
`,`2. Log in as an admin user.
`,`3. In the top left corner select the realm "${i.issuerUriParsed.realm}".
`,`4. In the left menu, click on "Clients".
`,`5. Locate the client "${n}" in the list and click on it.
`,`6. Find "Valid Redirect URIs" and add "${e}" to the list.
`,`7. Save the changes.

`,"For more information, refer to the documentation: https://docs.oidc-spa.dev/v/v9/providers-configuration/keycloak"]})(),`

`,"If nothing works, or if you see in the console a message mentioning 'refused to frame' there might be a problem with your CSP.","Read more: https://docs.oidc-spa.dev/v/v9/resources/csp-configuration"].join(" ")})}async function _(a){const{issuerUri:e,clientId:t}=a;e:{if(await g(`${e}${m}`))break e;return P({issuerUri:e})}return new u({isAuthServerLikelyDown:!1,messageOrCause:[`Failed to fetch the token endpoint.
`,`This is usually due to a CORS issue.
`,`Make sure you have added '${window.location.origin}' to the list of Web Origins`,`in the '${t}' client configuration of your OIDC server.
`,`
`,...(()=>{if(!v({issuerUri:e}))return["Check the documentation of your OIDC server to learn how to configure the public client (Authorization Code Flow + PKCE) properly."];const n=$({issuerUri:e});return[`Since it seems that you are using Keycloak, here are the steps to follow:
`,`1. Go to the Keycloak admin console: ${n.adminConsoleUrl_master}
`,`2. Log in as an admin user.
`,`3. In the top left corner select the realm "${n.issuerUriParsed.realm}".
`,`4. In the left menu, click on "Clients".
`,`5. Find '${t}' in the list of clients and click on it.
`,`6. Find 'Web Origins' and add '${window.location.origin}' to the list.
`,`7. Save the changes.

`,"More info: https://docs.oidc-spa.dev/v/v9/providers-configuration/keycloak"]})()].join(" ")})}export{_ as createFailedToFetchTokenEndpointInitializationError,b as createIframeTimeoutInitializationError,P as createWellKnownOidcConfigurationEndpointUnreachableInitializationError};
