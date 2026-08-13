import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,C as r,Ci as i,S as a,b as o,o as s,s as c,u as l,x as u}from"./iframe-DLhurhNv.js";import{n as d,r as f}from"./dist-BvuEP38C.js";function p({className:e,defaultValue:t,value:n,min:i=0,max:c=100,...l}){let d=h.useMemo(()=>Array.isArray(n)?n:Array.isArray(t)?t:[i,c],[n,t,i,c]);return(0,m.jsxs)(u,{"data-slot":`slider`,defaultValue:t,value:n,min:i,max:c,className:s(`relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col`,e),...l,children:[(0,m.jsx)(r,{"data-slot":`slider-track`,className:`bg-muted relative grow overflow-hidden rounded-full data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1`,children:(0,m.jsx)(o,{"data-slot":`slider-range`,className:`bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full`})}),Array.from({length:d.length},(e,t)=>(0,m.jsx)(a,{"data-slot":`slider-thumb`,className:`border-ring ring-ring/50 relative block size-3 shrink-0 rounded-full border bg-white transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50`},t))]})}var m,h,g=e((()=>{m=t(n(),1),h=t(i(),1),l(),c(),p.__docgenInfo={description:``,methods:[],displayName:`Slider`,props:{min:{defaultValue:{value:`0`,computed:!1},required:!1},max:{defaultValue:{value:`100`,computed:!1},required:!1}}}})),_,v,y,b,x,S,C,w,T;e((()=>{_=t(n(),1),f(),g(),v={title:`UI/Slider`,component:p,tags:[`autodocs`],args:{onValueChange:d(),onValueCommit:d()},argTypes:{defaultValue:{control:`object`,description:`The default value of the slider when it is first rendered.`},value:{control:`object`,description:`The controlled value of the slider.`},min:{control:{type:`number`},description:`The minimum value of the slider.`,table:{defaultValue:{summary:`0`}}},max:{control:{type:`number`},description:`The maximum value of the slider.`,table:{defaultValue:{summary:`100`}}},step:{control:{type:`number`},description:`The step value of the slider.`,table:{defaultValue:{summary:`1`}}},disabled:{control:`boolean`,description:`Whether the slider is disabled.`,table:{defaultValue:{summary:`false`}}},orientation:{control:`select`,options:[`horizontal`,`vertical`],description:`The orientation of the slider.`,table:{defaultValue:{summary:`horizontal`}}}}},y=e=>(0,_.jsx)(`div`,{className:`w-[300px]`,children:(0,_.jsx)(p,{...e})}),b={render:y,args:{defaultValue:[50]}},x={render:y,args:{defaultValue:[25,75]}},S={render:e=>(0,_.jsx)(`div`,{className:`h-[300px]`,children:(0,_.jsx)(p,{...e})}),args:{defaultValue:[50],orientation:`vertical`}},C={render:y,args:{defaultValue:[50],disabled:!0}},w={render:y,args:{defaultValue:[20],step:10,min:0,max:100}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    defaultValue: [50]
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    defaultValue: [25, 75]
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[300px]">
      <Slider {...args} />
    </div>,
  args: {
    defaultValue: [50],
    orientation: 'vertical'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    defaultValue: [50],
    disabled: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    defaultValue: [20],
    step: 10,
    min: 0,
    max: 100
  }
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Range`,`Vertical`,`Disabled`,`CustomStep`]}))();export{w as CustomStep,b as Default,C as Disabled,x as Range,S as Vertical,T as __namedExportsOrder,v as default};