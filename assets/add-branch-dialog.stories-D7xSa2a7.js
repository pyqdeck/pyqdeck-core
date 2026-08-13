import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-Dj9kFMWJ.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{a as o,c as s,d as c,n as l,o as u,s as d,t as f,u as p}from"./zod-UMecEc7r.js";import{F as m,t as h}from"./lucide-react-L7eFyXr_.js";import{r as g,t as _}from"./button-SXKX9Jta.js";import{a as v,c as y,i as b,l as x,o as S,r as C,s as w,t as T}from"./sheet-BK_MHpmX.js";import{n as E,t as D}from"./scroll-area-fsOZ4DWF.js";import{n as O,t as k}from"./branch-form-CrrU4c3q.js";function A({universities:e=[],form:t,onSubmit:n,open:r,onOpenChange:i,trigger:a=!0}){let{handleSubmit:o,formState:{isSubmitting:s=!1}={}}=t||{};return(0,j.jsxs)(T,{open:r,onOpenChange:i,children:[a&&(0,j.jsx)(y,{asChild:!0,children:(0,j.jsxs)(_,{variant:`none`,className:`font-roboto hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-start gap-2 border px-4 py-2 font-bold shadow-none transition-colors`,children:[(0,j.jsx)(m,{className:`h-4 w-4`}),(0,j.jsx)(`span`,{children:`Add Branch`})]})}),(0,j.jsxs)(C,{className:`flex w-full flex-col gap-0 overflow-hidden border-l p-0 shadow-none sm:max-w-md`,children:[(0,j.jsxs)(S,{className:`shrink-0 border-b p-4 sm:p-6`,children:[(0,j.jsx)(w,{className:`font-roboto text-xl font-bold`,children:`Add New Branch`}),(0,j.jsx)(b,{className:`font-roboto`,children:`Create a new academic branch for a specific university.`})]}),(0,j.jsx)(D,{className:`min-h-0 flex-1`,children:(0,j.jsx)(`form`,{id:`add-branch-form`,onSubmit:o(n),className:`p-4 sm:p-6`,children:(0,j.jsx)(k,{form:t,universities:e,showUniversitySelect:!0})})}),(0,j.jsx)(v,{className:`bg-muted/10 shrink-0 border-t p-4 sm:p-6`,children:(0,j.jsx)(_,{type:`submit`,form:`add-branch-form`,disabled:s,className:`font-roboto w-full border font-bold shadow-none`,children:s?`Creating Branch...`:`Create Branch`})})]})]})}var j,M=e((()=>{j=t(n(),1),r(),h(),g(),x(),E(),O(),A.__docgenInfo={description:``,methods:[],displayName:`AddBranchDialogView`,props:{universities:{defaultValue:{value:`[]`,computed:!1},required:!1},trigger:{defaultValue:{value:`true`,computed:!1},required:!1}}}})),N,P,F,I,L,R,z,B,V,H;e((()=>{N=t(n(),1),a(),p(),s(),f(),M(),P=o({universityId:u().min(1,`Please select a university`),name:u().min(1,`Branch name is required`),shortName:u().min(1,`Short name is required`),branchCode:u().optional(),slug:u().min(1,`Slug is required`),isActive:l().default(!0)}),F={title:`Studio/Academics/AddBranchDialog`,component:A,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{universities:{control:`object`,description:`List of universities to select from`},open:{control:`boolean`,description:`Whether the dialog is open`},onOpenChange:{description:`Callback when open state changes`},onSubmit:{description:`Callback when form is submitted`},trigger:{control:`boolean`,description:`Whether to show the default trigger button`}},args:{onOpenChange:i(),onSubmit:i()}},I=({mockSubmitting:e=!1,...t})=>{let n=c({resolver:d(P),defaultValues:{universityId:``,name:``,shortName:``,branchCode:``,slug:``,isActive:!0}}),r={...n,formState:{...n.formState,isSubmitting:e}};return(0,N.jsx)(A,{...t,form:r})},L=[{id:`u1`,name:`University of Mumbai`,shortName:`MU`},{id:`u2`,name:`Savitribai Phule Pune University`,shortName:`SPPU`},{id:`u3`,name:`Gujarat Technological University`,shortName:`GTU`},{id:`u4`,name:`Anna University`,shortName:`AU`}],R={render:e=>(0,N.jsx)(I,{...e}),args:{universities:L,open:!0,trigger:!0}},z={render:e=>(0,N.jsx)(I,{...e}),args:{...R.args,mockSubmitting:!0}},B={render:e=>(0,N.jsx)(I,{...e}),args:{...R.args,universities:[]}},V={render:e=>(0,N.jsx)(I,{...e}),args:{...R.args,trigger:!1}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    universities: mockUniversities,
    open: true,
    trigger: true
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    universities: []
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    trigger: false
  }
}`,...V.parameters?.docs?.source}}},H=[`Default`,`Submitting`,`Empty`,`WithoutTrigger`]}))();export{R as Default,B as Empty,z as Submitting,V as WithoutTrigger,H as __namedExportsOrder,F as default};