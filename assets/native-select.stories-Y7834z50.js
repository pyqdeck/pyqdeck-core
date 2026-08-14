import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,o as i,s as a}from"./iframe-BRAiZSiM.js";import{n as o,r as s}from"./dist-BvuEP38C.js";import{Dt as c,t as l}from"./lucide-react-DofwPGTf.js";function u({className:e,size:t=`default`,...n}){return(0,p.jsxs)(`div`,{className:i(`group/native-select relative w-fit has-[select:disabled]:opacity-50`,e),"data-slot":`native-select-wrapper`,"data-size":t,children:[(0,p.jsx)(`select`,{"data-slot":`native-select`,"data-size":t,className:`border-input selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 appearance-none rounded-lg border bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors outline-none select-none focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:ring-3 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5`,...n}),(0,p.jsx)(c,{className:`text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 select-none`,"aria-hidden":`true`,"data-slot":`native-select-icon`})]})}function d({className:e,...t}){return(0,p.jsx)(`option`,{"data-slot":`native-select-option`,className:i(`bg-[Canvas] text-[CanvasText]`,e),...t})}function f({className:e,...t}){return(0,p.jsx)(`optgroup`,{"data-slot":`native-select-optgroup`,className:i(`bg-[Canvas] text-[CanvasText]`,e),...t})}var p,m=e((()=>{p=t(n(),1),r(),a(),l(),u.__docgenInfo={description:``,methods:[],displayName:`NativeSelect`,props:{size:{defaultValue:{value:`'default'`,computed:!1},required:!1}}},f.__docgenInfo={description:``,methods:[],displayName:`NativeSelectOptGroup`},d.__docgenInfo={description:``,methods:[],displayName:`NativeSelectOption`}})),h,g,_,v,y,b,x,S;e((()=>{h=t(n(),1),s(),m(),g={title:`UI/NativeSelect`,component:u,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`default`,`sm`],description:`The size of the select.`,table:{defaultValue:{summary:`default`}}},disabled:{control:`boolean`,description:`Whether the select is disabled.`,table:{defaultValue:{summary:`false`}}}},args:{onChange:o()}},_=e=>(0,h.jsxs)(u,{...e,className:`w-[240px]`,children:[(0,h.jsx)(d,{value:`computer-engineering`,children:`Computer Engineering`}),(0,h.jsx)(d,{value:`information-technology`,children:`Information Technology`}),(0,h.jsx)(d,{value:`electronics-communication`,children:`Electronics & Communication`}),(0,h.jsx)(d,{value:`mechanical-engineering`,children:`Mechanical Engineering`})]}),v={render:_,args:{size:`default`}},y={render:_,args:{size:`sm`}},b={render:_,args:{disabled:!0}},x={render:e=>(0,h.jsxs)(u,{...e,className:`w-[240px]`,children:[(0,h.jsxs)(f,{label:`Core Branches`,children:[(0,h.jsx)(d,{value:`computer-engineering`,children:`Computer Engineering`}),(0,h.jsx)(d,{value:`information-technology`,children:`Information Technology`})]}),(0,h.jsxs)(f,{label:`Other Branches`,children:[(0,h.jsx)(d,{value:`mechanical-engineering`,children:`Mechanical Engineering`}),(0,h.jsx)(d,{value:`civil-engineering`,children:`Civil Engineering`})]})]}),args:{size:`default`}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    size: 'default'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    size: 'sm'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    disabled: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <NativeSelect {...args} className="w-[240px]">
      <NativeSelectOptGroup label="Core Branches">
        <NativeSelectOption value="computer-engineering">
          Computer Engineering
        </NativeSelectOption>
        <NativeSelectOption value="information-technology">
          Information Technology
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Other Branches">
        <NativeSelectOption value="mechanical-engineering">
          Mechanical Engineering
        </NativeSelectOption>
        <NativeSelectOption value="civil-engineering">
          Civil Engineering
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>,
  args: {
    size: 'default'
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Small`,`Disabled`,`WithGroups`]}))();export{v as Default,b as Disabled,y as Small,x as WithGroups,S as __namedExportsOrder,g as default};