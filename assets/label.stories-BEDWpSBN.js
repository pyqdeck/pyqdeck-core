import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-Dj9kFMWJ.js";import{n as r,t as i}from"./label-BMGc_qE-.js";import{n as a,t as o}from"./input-C3TQa1ow.js";import{n as s,t as c}from"./checkbox-CRq9h2gv.js";var l,u,d,f,p,m,h,g;e((()=>{l=t(n(),1),r(),a(),s(),u={title:`UI/Label`,component:i,tags:[`autodocs`],argTypes:{children:{control:`text`,description:`The content of the label`},htmlFor:{control:`text`,description:`The id of the element the label is associated with`},className:{control:`text`,description:`Additional CSS classes`}}},d={args:{children:`Label Text`}},f={render:e=>(0,l.jsxs)(`div`,{className:`grid w-full max-w-sm items-center gap-1.5`,children:[(0,l.jsx)(i,{htmlFor:`email`,...e}),(0,l.jsx)(o,{type:`email`,id:`email`,placeholder:`Email`})]}),args:{children:`Email Address`}},p={render:e=>(0,l.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,l.jsx)(c,{id:`terms`}),(0,l.jsx)(i,{htmlFor:`terms`,...e})]}),args:{children:`Accept terms and conditions`}},m={render:e=>(0,l.jsxs)(`div`,{className:`grid w-full max-w-sm items-center gap-1.5`,children:[(0,l.jsxs)(i,{htmlFor:`username`,...e,children:[e.children,(0,l.jsx)(`span`,{className:`text-destructive`,children:`*`})]}),(0,l.jsx)(o,{type:`text`,id:`username`,placeholder:`Username`,required:!0})]}),args:{children:`Username`}},h={render:e=>(0,l.jsxs)(`div`,{className:`group grid w-full max-w-sm items-center gap-1.5`,"data-disabled":`true`,children:[(0,l.jsx)(i,{htmlFor:`disabled-input`,...e}),(0,l.jsx)(o,{disabled:!0,id:`disabled-input`,placeholder:`Disabled input`})]}),args:{children:`Disabled Field`}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Label Text'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" {...args} />
      <Input type="email" id="email" placeholder="Email" />
    </div>,
  args: {
    children: 'Email Address'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" {...args} />
    </div>,
  args: {
    children: 'Accept terms and conditions'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username" {...args}>
        {args.children}
        <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="username" placeholder="Username" required />
    </div>,
  args: {
    children: 'Username'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <div className="group grid w-full max-w-sm items-center gap-1.5" data-disabled="true">
      <Label htmlFor="disabled-input" {...args} />
      <Input disabled id="disabled-input" placeholder="Disabled input" />
    </div>,
  args: {
    children: 'Disabled Field'
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`WithInput`,`WithCheckbox`,`Required`,`Disabled`]}))();export{d as Default,h as Disabled,m as Required,p as WithCheckbox,f as WithInput,g as __namedExportsOrder,u as default};