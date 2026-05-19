import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DxRZmAER.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{d as a,i as o,o as s,r as c,t as l}from"./field-CuwpDw7I.js";import{n as u,t as d}from"./textarea-BGXijZQy.js";var f,p,m,h,g,_,v,y,b,x;e((()=>{f=t(n(),1),i(),a(),u(),p={title:`UI/Textarea`,component:d,tags:[`autodocs`],argTypes:{placeholder:{control:`text`,description:`The placeholder text to display when the textarea is empty.`},disabled:{control:`boolean`,description:`Whether the textarea is disabled.`,table:{defaultValue:{summary:`false`}}},readOnly:{control:`boolean`,description:`Whether the textarea is read-only.`,table:{defaultValue:{summary:`false`}}},"aria-invalid":{control:`boolean`,description:`Whether the textarea is in an invalid state.`,table:{defaultValue:{summary:`false`}}}},args:{onChange:r(),onFocus:r(),onBlur:r()}},m={args:{placeholder:`Enter course objectives...`}},h={args:{disabled:!0,placeholder:`System maintenance in progress...`,defaultValue:`This textarea is currently disabled while the academic records are being updated.`}},g={args:{readOnly:!0,defaultValue:`The Bachelor of Science in Computer Science (BSCS) focuses on the theoretical foundations of computing and their practical applications.`}},_={args:{"aria-invalid":!0,defaultValue:`Short text.`,placeholder:`Please enter at least 50 characters...`}},v={render:e=>(0,f.jsxs)(l,{children:[(0,f.jsx)(s,{children:`Research Abstract`}),(0,f.jsx)(d,{...e})]}),args:{placeholder:`Summarize your research findings and methodology...`}},y={render:e=>(0,f.jsxs)(l,{children:[(0,f.jsx)(s,{children:`Program Feedback`}),(0,f.jsx)(d,{...e}),(0,f.jsx)(c,{children:`Provide constructive feedback about your experience in the engineering program.`})]}),args:{placeholder:`I found the curriculum to be very comprehensive...`}},b={render:e=>(0,f.jsxs)(l,{children:[(0,f.jsx)(s,{children:`Course Syllabus`}),(0,f.jsx)(d,{...e,"aria-invalid":!0}),(0,f.jsx)(o,{children:`The syllabus content must be provided for all new course proposals.`})]}),args:{placeholder:`Paste the full course syllabus here...`}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter course objectives...'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: 'System maintenance in progress...',
    defaultValue: 'This textarea is currently disabled while the academic records are being updated.'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    defaultValue: 'The Bachelor of Science in Computer Science (BSCS) focuses on the theoretical foundations of computing and their practical applications.'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    'aria-invalid': true,
    defaultValue: 'Short text.',
    placeholder: 'Please enter at least 50 characters...'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Field>
      <FieldLabel>Research Abstract</FieldLabel>
      <Textarea {...args} />
    </Field>,
  args: {
    placeholder: 'Summarize your research findings and methodology...'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <Field>
      <FieldLabel>Program Feedback</FieldLabel>
      <Textarea {...args} />
      <FieldDescription>
        Provide constructive feedback about your experience in the engineering
        program.
      </FieldDescription>
    </Field>,
  args: {
    placeholder: 'I found the curriculum to be very comprehensive...'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <Field>
      <FieldLabel>Course Syllabus</FieldLabel>
      <Textarea {...args} aria-invalid={true} />
      <FieldError>
        The syllabus content must be provided for all new course proposals.
      </FieldError>
    </Field>,
  args: {
    placeholder: 'Paste the full course syllabus here...'
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Disabled`,`ReadOnly`,`Invalid`,`WithLabel`,`WithDescription`,`WithError`]}))();export{m as Default,h as Disabled,_ as Invalid,g as ReadOnly,y as WithDescription,b as WithError,v as WithLabel,x as __namedExportsOrder,p as default};