import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-Dj9kFMWJ.js";import{n as i,t as a}from"./separator-Cwbtcy1t.js";import{a as o,i as s,n as c,r as l,t as u}from"./es-Du45fwHx.js";function d({value:e,suffix:t}){let n=(0,m.useRef)(null),r=c(n,{once:!0,margin:`-50px`}),i=s(0),a=l(i,{duration:1200,bounce:0}),[o,u]=(0,m.useState)(0);return(0,m.useEffect)(()=>{r&&i.set(e)},[r,i,e]),(0,m.useEffect)(()=>a.on(`change`,e=>u(Math.round(e))),[a]),(0,p.jsxs)(`span`,{ref:n,children:[o,t]})}function f(){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a,{}),(0,p.jsx)(`div`,{className:`bg-muted/40`,children:(0,p.jsx)(`div`,{className:`mx-auto max-w-5xl px-4 py-12`,children:(0,p.jsx)(`div`,{className:`grid grid-cols-2 gap-8 sm:grid-cols-4`,children:h.map((e,t)=>(0,p.jsxs)(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:t*.1},className:`flex flex-col items-center gap-1 text-center`,children:[(0,p.jsx)(`span`,{className:`text-primary text-4xl font-extrabold`,children:(0,p.jsx)(d,{value:e.value,suffix:e.suffix})}),(0,p.jsx)(`span`,{className:`text-muted-foreground text-sm font-medium`,children:e.label})]},e.label))})})}),(0,p.jsx)(a,{})]})}var p,m,h,g=e((()=>{p=t(n(),1),m=t(r(),1),u(),i(),h=[{value:50,suffix:`+`,label:`Universities`},{value:10,suffix:`K+`,label:`Question Papers`},{value:25,suffix:`K+`,label:`Solutions`},{value:100,suffix:`K+`,label:`Students`}],f.__docgenInfo={description:``,methods:[],displayName:`Stats`}})),_,v,y,b,x;e((()=>{_=t(n(),1),r(),g(),v={title:`Landing/Stats`,component:f,parameters:{layout:`fullscreen`},tags:[`autodocs`]},y={render:()=>(0,_.jsx)(`div`,{className:`bg-background py-20`,children:(0,_.jsx)(f,{})})},b={parameters:{themes:{default:`dark`}},render:()=>(0,_.jsx)(`div`,{className:`bg-background dark py-20`,children:(0,_.jsx)(f,{})})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="bg-background py-20">
      <Stats />
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    themes: {
      default: 'dark'
    }
  },
  render: () => <div className="bg-background dark py-20">
      <Stats />
    </div>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`DarkMode`]}))();export{b as DarkMode,y as Default,x as __namedExportsOrder,v as default};