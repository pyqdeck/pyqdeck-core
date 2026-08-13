import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-DSzFGOoK.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{a as o,c as s,d as c,i as l,o as u,s as d,t as f,u as p}from"./zod-Br7Y57mD.js";import{n as m,t as h}from"./add-module-dialog.view-7ophIOlO.js";var g,_,v,y,b,x,S,C,w;e((()=>{g=t(n(),1),m(),p(),s(),f(),a(),_=t(r(),1),v=o({syllabusId:u().min(1,`Syllabus ID is required`),moduleNumber:l().int().min(1,`Must be at least 1`),title:u().min(1,`Title is required`).max(200),description:u().max(1e3).optional().nullable(),weightage:l().min(0).max(100).optional().nullable(),coMapping:u().max(50).optional().nullable(),slug:u().min(1,`Slug is required`)}),y={title:`Studio/Academics/AddModuleDialog`,component:h,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{open:{control:`boolean`,description:`Whether the dialog is open`,table:{defaultValue:{summary:`false`}}},onOpenChange:{description:`Callback when the open state changes`},onSubmit:{description:`Callback when the form is submitted`},trigger:{control:`boolean`,description:`Whether to show the trigger button`,table:{defaultValue:{summary:`true`}}},form:{description:`The react-hook-form instance`,control:!1}}},b=({mockSubmitting:e=!1,...t})=>{let n=c({resolver:d(v),defaultValues:{syllabusId:`syl-cs-301`,moduleNumber:1,title:``,description:``,weightage:0,coMapping:``,slug:``}}),r={...n,formState:{...n.formState,errors:n.formState.errors,isSubmitting:e}};return(0,g.jsx)(h,{...t,form:r})},x={render:e=>(0,g.jsx)(b,{...e}),args:{open:!0,onOpenChange:i(),onSubmit:i(),trigger:!0}},S={render:e=>(0,g.jsx)(b,{...e}),args:{...x.args,mockSubmitting:!0}},C={render:e=>{let t=c({resolver:d(v),defaultValues:{syllabusId:``,moduleNumber:0,title:``,description:`Detailing excessive content `.repeat(50),weightage:150,coMapping:`INVALID_CO`,slug:``}});return(0,_.useEffect)(()=>{t.trigger()},[t]),(0,g.jsx)(h,{...e,form:t})},args:{open:!0,onOpenChange:i(),onSubmit:i(),trigger:!0}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
    trigger: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => {
    const form = useForm({
      resolver: zodResolver(moduleSchema),
      defaultValues: {
        syllabusId: '',
        moduleNumber: 0,
        title: '',
        description: 'Detailing excessive content '.repeat(50),
        weightage: 150,
        coMapping: 'INVALID_CO',
        slug: ''
      }
    });

    // Manually trigger validation to show errors
    useEffect(() => {
      form.trigger();
    }, [form]);
    return <AddModuleDialogView {...args} form={form} />;
  },
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
    trigger: true
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Submitting`,`WithErrors`]}))();export{x as Default,S as Submitting,C as WithErrors,w as __namedExportsOrder,y as default};