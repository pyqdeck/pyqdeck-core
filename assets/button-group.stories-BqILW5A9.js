import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Sr as r,o as i,s as a,u as o}from"./iframe-DSzFGOoK.js";import{E as s,Vt as c,X as l,h as u,m as d,p as f,t as p,u as m}from"./lucide-react-CSsGbmlG.js";import{n as h,t as g}from"./dist-DQuVb6PR.js";import{r as _,t as v}from"./button-BY_Vhp9z.js";import{n as y,t as b}from"./separator-CQxmU7tC.js";function x({className:e,orientation:t,...n}){return(0,w.jsx)(`div`,{role:`group`,"data-slot":`button-group`,"data-orientation":t,className:i(T({orientation:t}),e),...n})}function S({className:e,asChild:t=!1,...n}){return(0,w.jsx)(t?r:`div`,{className:i(`bg-muted flex items-center gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`,e),...n})}function C({className:e,orientation:t=`vertical`,...n}){return(0,w.jsx)(b,{"data-slot":`button-group-separator`,orientation:t,className:i(`bg-input relative self-stretch data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto`,e),...n})}var w,T,E=e((()=>{w=t(n(),1),h(),o(),a(),y(),T=g(`group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1`,{variants:{orientation:{horizontal:`[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!`,vertical:`flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!`}},defaultVariants:{orientation:`horizontal`}}),x.__docgenInfo={description:``,methods:[],displayName:`ButtonGroup`},C.__docgenInfo={description:``,methods:[],displayName:`ButtonGroupSeparator`,props:{orientation:{defaultValue:{value:`'vertical'`,computed:!1},required:!1}}},S.__docgenInfo={description:``,methods:[],displayName:`ButtonGroupText`,props:{asChild:{defaultValue:{value:`false`,computed:!1},required:!1}}}})),D,O,k,A,j,M,N,P;e((()=>{D=t(n(),1),E(),_(),p(),O={title:`UI/ButtonGroup`,component:x,tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`]}}},k={args:{orientation:`horizontal`},render:e=>(0,D.jsxs)(x,{...e,children:[(0,D.jsx)(v,{variant:`outline`,children:`Left`}),(0,D.jsx)(v,{variant:`outline`,children:`Middle`}),(0,D.jsx)(v,{variant:`outline`,children:`Right`})]})},A={args:{orientation:`vertical`},render:e=>(0,D.jsxs)(x,{...e,children:[(0,D.jsx)(v,{variant:`outline`,children:`Top`}),(0,D.jsx)(v,{variant:`outline`,children:`Middle`}),(0,D.jsx)(v,{variant:`outline`,children:`Bottom`})]})},j={render:e=>(0,D.jsxs)(x,{...e,children:[(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(c,{className:`size-4`})}),(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(l,{className:`size-4`})}),(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(m,{className:`size-4`})})]})},M={render:e=>(0,D.jsxs)(x,{...e,children:[(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(f,{className:`size-4`})}),(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(u,{className:`size-4`})}),(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(d,{className:`size-4`})}),(0,D.jsx)(C,{}),(0,D.jsx)(v,{variant:`outline`,children:`Format`})]})},N={render:e=>(0,D.jsxs)(x,{...e,children:[(0,D.jsx)(S,{children:`View`}),(0,D.jsx)(v,{variant:`outline`,children:`Desktop`}),(0,D.jsx)(v,{variant:`outline`,children:`Mobile`}),(0,D.jsx)(C,{}),(0,D.jsx)(v,{variant:`outline`,size:`icon`,children:(0,D.jsx)(s,{className:`size-4`})})]})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal'
  },
  render: args => <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  render: args => <ButtonGroup {...args}>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonGroup {...args}>
      <Button variant="outline" size="icon">
        <Bold className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="size-4" />
      </Button>
    </ButtonGroup>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonGroup {...args}>
      <Button variant="outline" size="icon">
        <AlignLeft className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <AlignCenter className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <AlignRight className="size-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Format</Button>
    </ButtonGroup>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonGroup {...args}>
      <ButtonGroupText>View</ButtonGroupText>
      <Button variant="outline">Desktop</Button>
      <Button variant="outline">Mobile</Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon">
        <Settings className="size-4" />
      </Button>
    </ButtonGroup>
}`,...N.parameters?.docs?.source}}},P=[`Horizontal`,`Vertical`,`WithIcons`,`WithSeparators`,`Mixed`]}))();export{k as Horizontal,N as Mixed,A as Vertical,j as WithIcons,M as WithSeparators,P as __namedExportsOrder,O as default};