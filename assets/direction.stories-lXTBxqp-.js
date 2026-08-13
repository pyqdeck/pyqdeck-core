import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,pr as i,u as a}from"./iframe-DSzFGOoK.js";import{r as o,t as s}from"./button-BY_Vhp9z.js";import{n as c,t as l}from"./input-IzTX4jLM.js";function u({dir:e,direction:t,children:n}){return(0,d.jsx)(i,{dir:t??e,children:n})}var d,f=e((()=>{d=t(n(),1),r(),a(),u.__docgenInfo={description:``,methods:[],displayName:`DirectionProvider`}})),p,m,h,g,_,v,y,b;e((()=>{p=t(n(),1),m=t(r(),1),f(),o(),c(),h={title:`UI/Direction`,component:u,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{dir:{control:`select`,options:[`ltr`,`rtl`],description:`The direction of the text`,table:{defaultValue:{summary:`ltr`}}},direction:{control:`select`,options:[`ltr`,`rtl`],description:`Explicit direction override`},children:{control:!1}}},g=e=>(0,p.jsx)(u,{...e,children:(0,p.jsxs)(`div`,{dir:e.dir,className:`w-[400px] space-y-4 rounded-lg border p-4`,children:[(0,p.jsxs)(`p`,{className:`text-sm`,children:[`Current Direction:`,` `,(0,p.jsx)(`span`,{className:`font-bold uppercase`,children:e.dir||`ltr`})]}),(0,p.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,p.jsx)(l,{placeholder:`Enter text...`,className:`flex-1`}),(0,p.jsx)(s,{children:`Send`})]}),(0,p.jsx)(`p`,{className:`text-muted-foreground text-xs`,children:`Notice how the input and button swap places in RTL mode if using flex or logical properties.`})]})}),_={render:()=>{let[e,t]=(0,m.useState)(`ltr`);return(0,p.jsxs)(`div`,{className:`space-y-4`,children:[(0,p.jsxs)(`div`,{className:`flex gap-2`,children:[(0,p.jsx)(s,{onClick:()=>t(`ltr`),variant:e===`ltr`?`default`:`outline`,children:`LTR`}),(0,p.jsx)(s,{onClick:()=>t(`rtl`),variant:e===`rtl`?`default`:`outline`,children:`RTL`})]}),(0,p.jsx)(u,{dir:e,children:(0,p.jsxs)(`div`,{dir:e,className:`w-[400px] space-y-4 rounded-lg border p-4`,children:[(0,p.jsxs)(`p`,{className:`text-sm`,children:[`Current Direction:`,` `,(0,p.jsx)(`span`,{className:`font-bold uppercase`,children:e})]}),(0,p.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,p.jsx)(l,{placeholder:`Enter text...`,className:`flex-1`}),(0,p.jsx)(s,{children:`Send`})]}),(0,p.jsx)(`p`,{className:`text-muted-foreground text-xs`,children:`Notice how the input and button swap places in RTL mode if using flex or logical properties.`})]})})]})}},v={render:g,args:{dir:`ltr`}},y={render:g,args:{dir:`rtl`}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [dir, setDir] = useState('ltr');
    return <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setDir('ltr')} variant={dir === 'ltr' ? 'default' : 'outline'}>
            LTR
          </Button>
          <Button onClick={() => setDir('rtl')} variant={dir === 'rtl' ? 'default' : 'outline'}>
            RTL
          </Button>
        </div>

        <DirectionProvider dir={dir}>
          <div dir={dir} className="w-[400px] space-y-4 rounded-lg border p-4">
            <p className="text-sm">
              Current Direction:{' '}
              <span className="font-bold uppercase">{dir}</span>
            </p>
            <div className="flex items-center gap-2">
              <Input placeholder="Enter text..." className="flex-1" />
              <Button>Send</Button>
            </div>
            <p className="text-muted-foreground text-xs">
              Notice how the input and button swap places in RTL mode if using
              flex or logical properties.
            </p>
          </div>
        </DirectionProvider>
      </div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    dir: 'ltr'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    dir: 'rtl'
  }
}`,...y.parameters?.docs?.source}}},b=[`Interactive`,`LTR`,`RTL`]}))();export{_ as Interactive,v as LTR,y as RTL,b as __namedExportsOrder,h as default};