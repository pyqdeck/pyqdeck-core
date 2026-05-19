import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DxRZmAER.js";import{a as r,c as i,d as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f,u as p}from"./field-CuwpDw7I.js";import{n as m,t as h}from"./input-B1doZZlU.js";var g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{g=t(n(),1),a(),m(),_={title:`UI/Field`,component:f,tags:[`autodocs`],argTypes:{orientation:{control:{type:`select`},options:[`vertical`,`horizontal`,`responsive`],description:`Layout orientation of the field`,table:{defaultValue:{summary:`vertical`}}}},parameters:{docs:{description:{component:`A flexible field component for forms, supporting various layouts and sub-components.`}}}},v=e=>(0,g.jsxs)(f,{...e,children:[(0,g.jsx)(l,{children:`University Email`}),(0,g.jsx)(h,{placeholder:`admin@university.edu`}),(0,g.jsx)(u,{children:`Use your official university email address.`}),(0,g.jsx)(o,{})]}),y={render:v,args:{orientation:`vertical`}},b={render:e=>(0,g.jsxs)(f,{...e,"data-invalid":`true`,children:[(0,g.jsx)(l,{children:`University ID`}),(0,g.jsx)(h,{defaultValue:`invalid-id`}),(0,g.jsx)(o,{children:`Please enter a valid university ID (e.g., UNIT-12345).`})]}),args:{orientation:`vertical`}},x={render:e=>(0,g.jsxs)(f,{...e,className:`items-center`,children:[(0,g.jsx)(l,{className:`w-48`,children:`Department Name`}),(0,g.jsx)(`div`,{className:`flex-1`,children:(0,g.jsx)(h,{placeholder:`e.g., Computer Science`})})]}),args:{orientation:`horizontal`}},S={render:e=>(0,g.jsxs)(f,{...e,children:[(0,g.jsx)(l,{className:`w-48`,children:`Branch Code`}),(0,g.jsx)(`div`,{className:`flex-1`,children:(0,g.jsx)(h,{placeholder:`e.g., CSE`})})]}),args:{orientation:`responsive`}},C={render:()=>(0,g.jsxs)(s,{children:[(0,g.jsx)(d,{children:`Academic Information`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(l,{children:`University`}),(0,g.jsx)(h,{placeholder:`Enter university name`})]}),(0,g.jsxs)(f,{children:[(0,g.jsx)(l,{children:`Branch`}),(0,g.jsx)(h,{placeholder:`Enter branch name`})]})]})},w={render:()=>(0,g.jsxs)(r,{children:[(0,g.jsxs)(f,{children:[(0,g.jsx)(l,{children:`First Name`}),(0,g.jsx)(h,{placeholder:`John`})]}),(0,g.jsx)(i,{children:`Optional Information`}),(0,g.jsxs)(f,{children:[(0,g.jsx)(l,{children:`Middle Name`}),(0,g.jsx)(h,{placeholder:`Quincy`})]}),(0,g.jsx)(i,{}),(0,g.jsxs)(f,{children:[(0,g.jsx)(l,{children:`Last Name`}),(0,g.jsx)(h,{placeholder:`Doe`})]})]})},T={render:()=>(0,g.jsxs)(f,{children:[(0,g.jsx)(p,{children:`Privacy Settings`}),(0,g.jsxs)(c,{children:[(0,g.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,g.jsx)(h,{type:`checkbox`,className:`h-4 w-4`}),(0,g.jsx)(`span`,{className:`text-sm`,children:`Make profile public`})]}),(0,g.jsx)(u,{children:`Your profile will be visible to all students and faculty.`})]})]})},E={render:e=>(0,g.jsxs)(f,{...e,"data-invalid":`true`,children:[(0,g.jsx)(l,{children:`Password`}),(0,g.jsx)(h,{type:`password`,defaultValue:`123`}),(0,g.jsx)(o,{errors:[{message:`Password must be at least 8 characters long.`},{message:`Password must contain at least one uppercase letter.`},{message:`Password must contain at least one special character.`}]})]}),args:{orientation:`vertical`}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    orientation: 'vertical'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <Field {...args} data-invalid="true">
      <FieldLabel>University ID</FieldLabel>
      <Input defaultValue="invalid-id" />
      <FieldError>
        Please enter a valid university ID (e.g., UNIT-12345).
      </FieldError>
    </Field>,
  args: {
    orientation: 'vertical'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <Field {...args} className="items-center">
      <FieldLabel className="w-48">Department Name</FieldLabel>
      <div className="flex-1">
        <Input placeholder="e.g., Computer Science" />
      </div>
    </Field>,
  args: {
    orientation: 'horizontal'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Field {...args}>
      <FieldLabel className="w-48">Branch Code</FieldLabel>
      <div className="flex-1">
        <Input placeholder="e.g., CSE" />
      </div>
    </Field>,
  args: {
    orientation: 'responsive'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <FieldSet>
      <FieldLegend>Academic Information</FieldLegend>
      <Field>
        <FieldLabel>University</FieldLabel>
        <Input placeholder="Enter university name" />
      </Field>
      <Field>
        <FieldLabel>Branch</FieldLabel>
        <Input placeholder="Enter branch name" />
      </Field>
    </FieldSet>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <FieldGroup>
      <Field>
        <FieldLabel>First Name</FieldLabel>
        <Input placeholder="John" />
      </Field>
      <FieldSeparator>Optional Information</FieldSeparator>
      <Field>
        <FieldLabel>Middle Name</FieldLabel>
        <Input placeholder="Quincy" />
      </Field>
      <FieldSeparator />
      <Field>
        <FieldLabel>Last Name</FieldLabel>
        <Input placeholder="Doe" />
      </Field>
    </FieldGroup>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Field>
      <FieldTitle>Privacy Settings</FieldTitle>
      <FieldContent>
        <div className="flex items-center gap-2">
          <Input type="checkbox" className="h-4 w-4" />
          <span className="text-sm">Make profile public</span>
        </div>
        <FieldDescription>
          Your profile will be visible to all students and faculty.
        </FieldDescription>
      </FieldContent>
    </Field>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <Field {...args} data-invalid="true">
      <FieldLabel>Password</FieldLabel>
      <Input type="password" defaultValue="123" />
      <FieldError errors={[{
      message: 'Password must be at least 8 characters long.'
    }, {
      message: 'Password must contain at least one uppercase letter.'
    }, {
      message: 'Password must contain at least one special character.'
    }]} />
    </Field>,
  args: {
    orientation: 'vertical'
  }
}`,...E.parameters?.docs?.source}}},D=[`Default`,`WithError`,`Horizontal`,`Responsive`,`Field_Set`,`Field_Group`,`Field_Content`,`MultiError`]}))();export{y as Default,T as Field_Content,w as Field_Group,C as Field_Set,x as Horizontal,E as MultiError,S as Responsive,b as WithError,D as __namedExportsOrder,_ as default};