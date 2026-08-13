import{n as e}from"./chunk-CzyJ72yW.js";import{n as t,r as n}from"./dist-BvuEP38C.js";import{n as r,t as i}from"./input-C3TQa1ow.js";var a,o,s,c,l,u,d,f,p,m;e((()=>{n(),r(),a={title:`UI/Input`,component:i,tags:[`autodocs`],argTypes:{type:{control:{type:`select`},options:[`text`,`password`,`email`,`number`,`file`],description:`The type of the input`,table:{defaultValue:{summary:`text`}}},placeholder:{control:`text`,description:`Placeholder text`},disabled:{control:`boolean`,description:`Disables the input`,table:{defaultValue:{summary:`false`}}},readOnly:{control:`boolean`,description:`Makes the input read-only`,table:{defaultValue:{summary:`false`}}},"aria-invalid":{control:`boolean`,description:`Indicates the input is invalid`,table:{defaultValue:{summary:`false`}}}},args:{onChange:t(),onFocus:t(),onBlur:t()}},o={args:{placeholder:`Enter your name`,type:`text`}},s={args:{placeholder:`john.doe@example.com`,type:`email`}},c={args:{placeholder:`••••••••`,type:`password`}},l={args:{placeholder:`42`,type:`number`}},u={args:{type:`file`}},d={args:{disabled:!0,defaultValue:`Disabled input value`}},f={args:{readOnly:!0,defaultValue:`Read-only input value`}},p={args:{"aria-invalid":!0,defaultValue:`Invalid input value`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your name',
    type: 'text'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'john.doe@example.com',
    type: 'email'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: '••••••••',
    type: 'password'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: '42',
    type: 'number'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'file'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: 'Disabled input value'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    defaultValue: 'Read-only input value'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-invalid': true,
    defaultValue: 'Invalid input value'
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Email`,`Password`,`Number`,`File`,`Disabled`,`ReadOnly`,`Invalid`]}))();export{o as Default,d as Disabled,s as Email,u as File,p as Invalid,l as Number,c as Password,f as ReadOnly,m as __namedExportsOrder,a as default};