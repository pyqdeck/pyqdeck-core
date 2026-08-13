import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r,G as i,K as a,o,q as s,s as c,u as l}from"./iframe-DLhurhNv.js";import{n as u,r as d}from"./dist-BvuEP38C.js";import{n as f,t as p}from"./label-CbOQGwxe.js";function m({className:e,...t}){return(0,g.jsx)(s,{"data-slot":`radio-group`,className:o(`grid w-full gap-2`,e),...t})}function h({className:e,...t}){return(0,g.jsx)(a,{"data-slot":`radio-group-item`,className:o(`group/radio-group-item peer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary relative flex aspect-square size-4 shrink-0 rounded-full border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3`,e),...t,children:(0,g.jsx)(i,{"data-slot":`radio-group-indicator`,className:`flex size-4 items-center justify-center`,children:(0,g.jsx)(`span`,{className:`bg-primary-foreground absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full`})})})}var g,_=e((()=>{g=t(n(),1),r(),l(),c(),m.__docgenInfo={description:``,methods:[],displayName:`RadioGroup`},h.__docgenInfo={description:``,methods:[],displayName:`RadioGroupItem`}})),v,y,b,x,S,C,w;e((()=>{v=t(n(),1),d(),_(),f(),y={title:`UI/RadioGroup`,component:m,tags:[`autodocs`],argTypes:{disabled:{control:`boolean`,description:`Whether the radio group is disabled`,table:{defaultValue:{summary:`false`}}},defaultValue:{control:`text`,description:`The default value of the radio group`},onValueChange:{description:`Event handler called when the value changes`}},args:{onValueChange:u()}},b=e=>(0,v.jsxs)(m,{...e,children:[(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{value:`option-1`,id:`option-1`}),(0,v.jsx)(p,{htmlFor:`option-1`,children:`Option One`})]}),(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{value:`option-2`,id:`option-2`}),(0,v.jsx)(p,{htmlFor:`option-2`,children:`Option Two`})]}),(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{value:`option-3`,id:`option-3`}),(0,v.jsx)(p,{htmlFor:`option-3`,children:`Option Three`})]})]}),x={render:b,args:{defaultValue:`option-1`}},S={render:b,args:{defaultValue:`option-1`,disabled:!0}},C={render:e=>(0,v.jsx)(m,{...e,children:[1,2,3,4,5,6,7,8].map(e=>(0,v.jsxs)(`div`,{className:`flex items-center space-x-2`,children:[(0,v.jsx)(h,{value:`sem-${e}`,id:`sem-${e}`}),(0,v.jsxs)(p,{htmlFor:`sem-${e}`,children:[`Semester `,e]})]},e))}),args:{defaultValue:`sem-1`}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    defaultValue: 'option-1'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    defaultValue: 'option-1',
    disabled: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup {...args}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <div key={sem} className="flex items-center space-x-2">
          <RadioGroupItem value={\`sem-\${sem}\`} id={\`sem-\${sem}\`} />
          <Label htmlFor={\`sem-\${sem}\`}>Semester {sem}</Label>
        </div>)}
    </RadioGroup>,
  args: {
    defaultValue: 'sem-1'
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Disabled`,`SemesterSelection`]}))();export{x as Default,S as Disabled,C as SemesterSelection,w as __namedExportsOrder,y as default};