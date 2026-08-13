import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,d as i,f as a,o,s,u as c}from"./iframe-DLJV3Qbr.js";import{n as l,r as u}from"./dist-BvuEP38C.js";import{$ as d,K as f,Kt as p,Y as m,t as h,u as g,y as _}from"./lucide-react-BdVUdILY.js";import{n as v,r as y}from"./toggle-DfqN4XGU.js";function b({className:e,variant:t,size:n,spacing:r=0,orientation:i=`horizontal`,children:s,...c}){return(0,S.jsx)(a,{"data-slot":`toggle-group`,"data-variant":t,"data-size":n,"data-spacing":r,"data-orientation":i,style:{"--gap":r},className:o(`group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-vertical:flex-col data-vertical:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]`,e),...c,children:(0,S.jsx)(w.Provider,{value:{variant:t,size:n,spacing:r,orientation:i},children:s})})}function x({className:e,children:t,variant:n=`default`,size:r=`default`,...a}){let s=C.useContext(w);return(0,S.jsx)(i,{"data-slot":`toggle-group-item`,"data-variant":s.variant||n,"data-size":s.size||r,"data-spacing":s.spacing,className:o(`shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t`,y({variant:s.variant||n,size:s.size||r}),e),...a,children:t})}var S,C,w,T=e((()=>{S=t(n(),1),C=t(r(),1),c(),s(),v(),w=C.createContext({size:`default`,variant:`default`,spacing:0,orientation:`horizontal`}),b.__docgenInfo={description:``,methods:[],displayName:`ToggleGroup`,props:{spacing:{defaultValue:{value:`0`,computed:!1},required:!1},orientation:{defaultValue:{value:`'horizontal'`,computed:!1},required:!1}}},x.__docgenInfo={description:``,methods:[],displayName:`ToggleGroupItem`,props:{variant:{defaultValue:{value:`'default'`,computed:!1},required:!1},size:{defaultValue:{value:`'default'`,computed:!1},required:!1}}}})),E,D,O,k,A,j,M,N,P,F,I,L,R,z;e((()=>{E=t(n(),1),u(),T(),h(),D={title:`UI/ToggleGroup`,component:b,tags:[`autodocs`],argTypes:{type:{control:`select`,options:[`single`,`multiple`],description:`The type of selection that is allowed.`,table:{defaultValue:{summary:`single`}}},variant:{control:`select`,options:[`default`,`outline`],description:`The visual variant of the toggle group.`,table:{defaultValue:{summary:`default`}}},size:{control:`select`,options:[`default`,`sm`,`lg`],description:`The size of the toggle group items.`,table:{defaultValue:{summary:`default`}}},spacing:{control:{type:`number`,min:0,max:20,step:1},description:`The spacing between items (in pixels).`,table:{defaultValue:{summary:`0`}}},orientation:{control:`select`,options:[`horizontal`,`vertical`],description:`The orientation of the toggle group.`,table:{defaultValue:{summary:`horizontal`}}},disabled:{control:`boolean`,description:`Whether the toggle group is disabled.`,table:{defaultValue:{summary:`false`}}}},args:{onValueChange:l()}},O=e=>(0,E.jsxs)(b,{...e,children:[(0,E.jsxs)(x,{value:`list`,"aria-label":`List view`,children:[(0,E.jsx)(f,{className:`size-4`}),(0,E.jsx)(`span`,{children:`List`})]}),(0,E.jsxs)(x,{value:`grid`,"aria-label":`Grid view`,children:[(0,E.jsx)(m,{className:`size-4`}),(0,E.jsx)(`span`,{children:`Grid`})]}),(0,E.jsxs)(x,{value:`table`,"aria-label":`Table view`,children:[(0,E.jsx)(_,{className:`size-4`}),(0,E.jsx)(`span`,{children:`Table`})]})]}),k=e=>(0,E.jsxs)(b,{...e,children:[(0,E.jsx)(x,{value:`bold`,"aria-label":`Toggle bold`,children:(0,E.jsx)(p,{className:`size-4`})}),(0,E.jsx)(x,{value:`italic`,"aria-label":`Toggle italic`,children:(0,E.jsx)(d,{className:`size-4`})}),(0,E.jsx)(x,{value:`underline`,"aria-label":`Toggle underline`,children:(0,E.jsx)(g,{className:`size-4`})})]}),A={render:O,args:{type:`single`,defaultValue:`list`}},j={render:e=>(0,E.jsxs)(b,{...e,children:[(0,E.jsx)(x,{value:`sem-1`,children:`Sem 1`}),(0,E.jsx)(x,{value:`sem-2`,children:`Sem 2`}),(0,E.jsx)(x,{value:`sem-3`,children:`Sem 3`}),(0,E.jsx)(x,{value:`sem-4`,children:`Sem 4`})]}),args:{type:`multiple`,variant:`outline`}},M={render:k,args:{type:`multiple`,defaultValue:[`bold`,`italic`]}},N={render:k,args:{type:`multiple`,variant:`outline`}},P={render:O,args:{type:`single`,size:`sm`,defaultValue:`grid`}},F={render:O,args:{type:`single`,size:`lg`,defaultValue:`table`}},I={render:O,args:{type:`single`,orientation:`vertical`,defaultValue:`list`}},L={render:k,args:{type:`multiple`,spacing:2,defaultValue:[`bold`]}},R={render:O,args:{type:`single`,disabled:!0,defaultValue:`list`}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: ViewModeTemplate,
  args: {
    type: 'single',
    defaultValue: 'list'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <ToggleGroup {...args}>
      <ToggleGroupItem value="sem-1">Sem 1</ToggleGroupItem>
      <ToggleGroupItem value="sem-2">Sem 2</ToggleGroupItem>
      <ToggleGroupItem value="sem-3">Sem 3</ToggleGroupItem>
      <ToggleGroupItem value="sem-4">Sem 4</ToggleGroupItem>
    </ToggleGroup>,
  args: {
    type: 'multiple',
    variant: 'outline'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: FormattingTemplate,
  args: {
    type: 'multiple',
    defaultValue: ['bold', 'italic']
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: FormattingTemplate,
  args: {
    type: 'multiple',
    variant: 'outline'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: ViewModeTemplate,
  args: {
    type: 'single',
    size: 'sm',
    defaultValue: 'grid'
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: ViewModeTemplate,
  args: {
    type: 'single',
    size: 'lg',
    defaultValue: 'table'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: ViewModeTemplate,
  args: {
    type: 'single',
    orientation: 'vertical',
    defaultValue: 'list'
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: FormattingTemplate,
  args: {
    type: 'multiple',
    spacing: 2,
    defaultValue: ['bold']
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: ViewModeTemplate,
  args: {
    type: 'single',
    disabled: true,
    defaultValue: 'list'
  }
}`,...R.parameters?.docs?.source}}},z=[`Default`,`Semesters`,`Multiple`,`Outline`,`Small`,`Large`,`Vertical`,`Spacing`,`Disabled`]}))();export{A as Default,R as Disabled,F as Large,M as Multiple,N as Outline,j as Semesters,P as Small,L as Spacing,I as Vertical,z as __namedExportsOrder,D as default};