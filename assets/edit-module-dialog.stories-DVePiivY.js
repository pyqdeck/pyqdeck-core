import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-_w7TdDlw.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{a as o,c as s,d as c,i as l,l as u,o as d,s as f,t as p,u as m}from"./zod-Q3wu2E7J.js";import{Z as h,t as g}from"./lucide-react--sVyDIkY.js";import{r as _,t as v}from"./button-CMptGdcG.js";import{a as y,d as b,i as x,o as S,t as C}from"./field-qViBr0Um.js";import{n as w,t as T}from"./input-BlZIs4mU.js";import{a as E,c as D,i as O,n as k,o as A,r as j,t as M}from"./dialog-D5Iyn8FO.js";import{n as N,t as P}from"./textarea-DFqvSyGj.js";function F({form:e,onSubmit:t,open:n,onOpenChange:r}){let{control:i,handleSubmit:a,formState:{errors:o={},isSubmitting:s=!1}={}}=e||{};return(0,I.jsx)(M,{open:n,onOpenChange:r,children:(0,I.jsxs)(k,{className:`border-2 pb-0 shadow-none sm:max-w-[500px]`,children:[(0,I.jsxs)(E,{children:[(0,I.jsxs)(`div`,{className:`mb-2 flex items-center gap-3`,children:[(0,I.jsx)(`div`,{className:`bg-primary/10 text-primary rounded-lg p-2`,children:(0,I.jsx)(h,{className:`h-5 w-5`})}),(0,I.jsx)(A,{className:`font-roboto text-xl font-bold`,children:`Edit Module Details`})]}),(0,I.jsx)(j,{className:`font-roboto text-sm`,children:`Modify the properties and objectives of this curriculum unit.`})]}),(0,I.jsxs)(`form`,{onSubmit:a(t),className:`py-4`,children:[(0,I.jsxs)(y,{children:[(0,I.jsxs)(`div`,{className:`grid grid-cols-2 gap-4`,children:[(0,I.jsxs)(C,{"data-invalid":!!o.moduleNumber,children:[(0,I.jsx)(S,{className:`font-roboto font-bold`,children:`Module Number`}),(0,I.jsx)(u,{name:`moduleNumber`,control:i,render:({field:e})=>(0,I.jsx)(T,{...e,type:`number`,min:`1`,className:`font-roboto border-2 focus-visible:ring-0`,onChange:t=>e.onChange(parseInt(t.target.value)||0),"aria-invalid":!!o.moduleNumber})}),(0,I.jsx)(x,{errors:[o.moduleNumber]})]}),(0,I.jsxs)(C,{"data-invalid":!!o.weightage,children:[(0,I.jsx)(S,{className:`font-roboto font-bold`,children:`Exam Weightage (%)`}),(0,I.jsx)(u,{name:`weightage`,control:i,render:({field:e})=>(0,I.jsx)(T,{...e,type:`number`,min:`0`,max:`100`,className:`font-roboto border-2 focus-visible:ring-0`,onChange:t=>e.onChange(parseFloat(t.target.value)||0),"aria-invalid":!!o.weightage})}),(0,I.jsx)(x,{errors:[o.weightage]})]})]}),(0,I.jsxs)(C,{"data-invalid":!!o.title,children:[(0,I.jsx)(S,{className:`font-roboto font-bold`,children:`Module Title`}),(0,I.jsx)(u,{name:`title`,control:i,render:({field:e})=>(0,I.jsx)(T,{...e,className:`font-roboto border-2 focus-visible:ring-0`,"aria-invalid":!!o.title})}),(0,I.jsx)(x,{errors:[o.title]})]}),(0,I.jsxs)(C,{"data-invalid":!!o.coMapping,children:[(0,I.jsx)(S,{className:`font-roboto font-bold`,children:`CO Mapping`}),(0,I.jsx)(u,{name:`coMapping`,control:i,render:({field:e})=>(0,I.jsx)(T,{...e,className:`font-roboto border-2 focus-visible:ring-0`,"aria-invalid":!!o.coMapping})}),(0,I.jsx)(x,{errors:[o.coMapping]})]}),(0,I.jsxs)(C,{"data-invalid":!!o.description,children:[(0,I.jsx)(S,{className:`font-roboto font-bold`,children:`Learning Objectives`}),(0,I.jsx)(u,{name:`description`,control:i,render:({field:e})=>(0,I.jsx)(P,{...e,className:`font-roboto min-h-[100px] resize-none border-2 focus-visible:ring-0`,"aria-invalid":!!o.description})}),(0,I.jsx)(x,{errors:[o.description]})]})]}),(0,I.jsx)(O,{className:`pt-6`,children:(0,I.jsx)(v,{type:`submit`,disabled:s,className:`font-roboto bg-primary hover:bg-primary/90 h-11 w-full border-2 font-bold shadow-none`,children:s?`Saving...`:`Update Module`})})]})]})})}var I,L=e((()=>{I=t(n(),1),r(),g(),m(),_(),D(),w(),N(),b(),F.__docgenInfo={description:``,methods:[],displayName:`EditModuleDialogView`}})),R,z,B,V,H,U,W,G,K,q;e((()=>{R=t(n(),1),L(),m(),s(),p(),a(),z=t(r(),1),B=o({moduleNumber:l().int().min(1,`Must be at least 1`),title:d().min(1,`Title is required`).max(200),description:d().max(1e3).optional().nullable(),weightage:l().min(0).max(100).optional().nullable(),coMapping:d().max(50).optional().nullable()}),V={title:`Studio/Academics/EditModuleDialog`,component:F,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{open:{control:`boolean`,description:`Whether the dialog is open`,table:{defaultValue:{summary:`false`}}},onOpenChange:{description:`Callback when the open state changes`},onSubmit:{description:`Callback when the form is submitted`},form:{description:`The react-hook-form instance`,control:!1}}},H=({mockSubmitting:e=!1,initialData:t,...n})=>{let r=c({resolver:f(B),defaultValues:t||{moduleNumber:1,title:`Introduction to Artificial Intelligence`,description:`Foundational concepts of AI, history, and applications.`,weightage:15,coMapping:`CO1`}}),i={...r,formState:{...r.formState,errors:r.formState.errors,isSubmitting:e}};return(0,R.jsx)(F,{...n,form:i})},U={moduleNumber:2,title:`Machine Learning Fundamentals`,description:`Introduction to supervised and unsupervised learning algorithms.`,weightage:20,coMapping:`CO2`},W={render:e=>(0,R.jsx)(H,{...e}),args:{open:!0,initialData:U,onOpenChange:i(),onSubmit:i()}},G={render:e=>(0,R.jsx)(H,{...e}),args:{...W.args,mockSubmitting:!0}},K={render:e=>{let t=c({resolver:f(B),defaultValues:{moduleNumber:0,title:``,description:`Exceeding the character limit `.repeat(50),weightage:150,coMapping:`CO_MAPPING_THAT_IS_TOO_LONG_FOR_THE_LIMIT_DEFINED_IN_SCHEMA`}});return(0,z.useEffect)(()=>{t.trigger()},[t]),(0,R.jsx)(F,{...e,form:t})},args:{...W.args}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    open: true,
    initialData: mockModule,
    onOpenChange: fn(),
    onSubmit: fn()
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => {
    const form = useForm({
      resolver: zodResolver(moduleSchema),
      defaultValues: {
        moduleNumber: 0,
        title: '',
        description: 'Exceeding the character limit '.repeat(50),
        weightage: 150,
        coMapping: 'CO_MAPPING_THAT_IS_TOO_LONG_FOR_THE_LIMIT_DEFINED_IN_SCHEMA'
      }
    });
    useEffect(() => {
      form.trigger();
    }, [form]);
    return <EditModuleDialogView {...args} form={form} />;
  },
  args: {
    ...Default.args
  }
}`,...K.parameters?.docs?.source}}},q=[`Default`,`Submitting`,`WithErrors`]}))();export{W as Default,G as Submitting,K as WithErrors,q as __namedExportsOrder,V as default};