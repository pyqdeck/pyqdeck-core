import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DLJV3Qbr.js";import{n as r,t as i}from"./separator-CkRHDkDo.js";var a,o,s,c,l,u,d;e((()=>{a=t(n(),1),r(),o={title:`UI/Separator`,component:i,tags:[`autodocs`],argTypes:{orientation:{control:{type:`select`},options:[`horizontal`,`vertical`],description:`The orientation of the separator.`,table:{defaultValue:{summary:`horizontal`}}},decorative:{control:`boolean`,description:`Whether the component is purely decorative and should be ignored by assistive technology.`,table:{defaultValue:{summary:`true`}}}}},s=e=>(0,a.jsxs)(`div`,{className:`w-full max-w-md`,children:[(0,a.jsxs)(`div`,{className:`space-y-1`,children:[(0,a.jsx)(`h4`,{className:`text-sm leading-none font-medium`,children:`Anna University, Chennai`}),(0,a.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`A premier technical university in Tamil Nadu, India.`})]}),(0,a.jsx)(i,{className:`my-4`,...e}),(0,a.jsxs)(`div`,{className:`flex h-5 items-center space-x-4 text-sm`,children:[(0,a.jsx)(`div`,{children:`Branches`}),(0,a.jsx)(i,{orientation:`vertical`}),(0,a.jsx)(`div`,{children:`Semesters`}),(0,a.jsx)(i,{orientation:`vertical`}),(0,a.jsx)(`div`,{children:`Papers`})]})]}),c={render:s,args:{orientation:`horizontal`}},l={render:e=>(0,a.jsxs)(`div`,{className:`flex h-5 items-center space-x-4 text-sm`,children:[(0,a.jsx)(`div`,{children:`Computer Science`}),(0,a.jsx)(i,{...e}),(0,a.jsx)(`div`,{children:`Information Technology`}),(0,a.jsx)(i,{...e}),(0,a.jsx)(`div`,{children:`Electronics`})]}),args:{orientation:`vertical`}},u={render:s,args:{orientation:`horizontal`,decorative:!0}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    orientation: 'horizontal'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Computer Science</div>
      <Separator {...args} />
      <div>Information Technology</div>
      <Separator {...args} />
      <div>Electronics</div>
    </div>,
  args: {
    orientation: 'vertical'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    orientation: 'horizontal',
    decorative: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Vertical`,`Decorative`]}))();export{u as Decorative,c as Default,l as Vertical,d as __namedExportsOrder,o as default};