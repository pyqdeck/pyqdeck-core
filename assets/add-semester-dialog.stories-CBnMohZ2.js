import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-Dj9kFMWJ.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{a as o,c as s,d as c,i as l,l as u,o as d,s as f,t as p,u as m}from"./zod-UMecEc7r.js";import{F as h,t as g}from"./lucide-react-L7eFyXr_.js";import{r as _,t as v}from"./button-SXKX9Jta.js";import{n as y,t as b}from"./label-BMGc_qE-.js";import{n as x,t as S}from"./input-C3TQa1ow.js";import{c as C,i as w,l as T,n as E,s as D,t as O}from"./select-C5bObVBP.js";import{a as k,c as A,i as j,n as M,o as N,r as P,s as F,t as I}from"./dialog-j8uydPZD.js";function L({branches:e=[],form:t,onSubmit:n,open:r,onOpenChange:i,trigger:a=!0}){let{control:o,handleSubmit:s,formState:{errors:c={},isSubmitting:l=!1}={}}=t||{};return(0,R.jsxs)(I,{open:r,onOpenChange:i,children:[a&&(0,R.jsx)(F,{asChild:!0,children:(0,R.jsxs)(v,{size:`sm`,variant:`none`,className:`font-roboto hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-start gap-2 border px-3 py-2 font-bold shadow-none transition-colors`,children:[(0,R.jsx)(h,{className:`h-4 w-4`}),(0,R.jsx)(`span`,{children:`Add Semester`})]})}),(0,R.jsxs)(M,{className:`border shadow-none sm:max-w-[450px]`,children:[(0,R.jsxs)(k,{children:[(0,R.jsx)(N,{className:`font-roboto text-xl font-bold`,children:`Initialize Semester`}),(0,R.jsx)(P,{className:`font-roboto`,children:`Define a new academic period for the selected course branch.`})]}),(0,R.jsxs)(`form`,{onSubmit:s(n),className:`grid gap-5 py-4`,children:[(0,R.jsxs)(`div`,{className:`grid gap-2`,children:[(0,R.jsx)(b,{htmlFor:`branchId`,className:`font-roboto font-bold`,children:`Target Branch`}),(0,R.jsx)(u,{name:`branchId`,control:o,render:({field:t})=>(0,R.jsxs)(O,{onValueChange:t.onChange,value:t.value,children:[(0,R.jsx)(D,{className:`font-roboto w-full border focus:ring-0`,children:(0,R.jsx)(C,{placeholder:`Select a branch`})}),(0,R.jsx)(E,{className:`border shadow-none`,children:e.map(e=>(0,R.jsxs)(w,{value:e.id,className:`font-roboto`,children:[e.name,` (`,e.universityId?.shortName,`)`]},e.id))})]})}),c.branchId&&(0,R.jsx)(`p`,{className:`font-roboto text-destructive text-xs font-bold`,children:c.branchId.message})]}),(0,R.jsxs)(`div`,{className:`grid grid-cols-2 gap-4`,children:[(0,R.jsxs)(`div`,{className:`grid gap-2`,children:[(0,R.jsx)(b,{htmlFor:`number`,className:`font-roboto font-bold`,children:`Semester Number`}),(0,R.jsx)(u,{name:`number`,control:o,render:({field:e})=>(0,R.jsx)(S,{...e,id:`number`,type:`number`,min:`1`,max:`10`,placeholder:`e.g. 5`,className:`font-roboto border focus-visible:ring-0`})}),c.number&&(0,R.jsx)(`p`,{className:`font-roboto text-destructive text-xs font-bold`,children:c.number.message})]}),(0,R.jsxs)(`div`,{className:`grid gap-2`,children:[(0,R.jsx)(b,{htmlFor:`slug`,className:`font-roboto font-bold`,children:`URL Slug`}),(0,R.jsx)(u,{name:`slug`,control:o,render:({field:e})=>(0,R.jsx)(S,{...e,id:`slug`,placeholder:`semester-5`,className:`font-roboto border focus-visible:ring-0`})}),c.slug&&(0,R.jsx)(`p`,{className:`font-roboto text-destructive text-xs font-bold`,children:c.slug.message})]})]}),(0,R.jsxs)(`div`,{className:`grid gap-2`,children:[(0,R.jsx)(b,{htmlFor:`title`,className:`font-roboto font-bold`,children:`Display Title (Optional)`}),(0,R.jsx)(u,{name:`title`,control:o,render:({field:e})=>(0,R.jsx)(S,{...e,id:`title`,placeholder:`e.g. Semester 5 (Final Year)`,className:`font-roboto border focus-visible:ring-0`})})]}),(0,R.jsx)(j,{className:`pt-4`,children:(0,R.jsx)(v,{type:`submit`,disabled:l,className:`font-roboto w-full border font-bold shadow-none`,children:l?`Creating Semester...`:`Create Semester`})})]})]})]})}var R,z=e((()=>{R=t(n(),1),r(),g(),m(),_(),A(),T(),x(),y(),L.__docgenInfo={description:``,methods:[],displayName:`AddSemesterDialogView`,props:{branches:{defaultValue:{value:`[]`,computed:!1},required:!1},trigger:{defaultValue:{value:`true`,computed:!1},required:!1}}}})),B,V,H,U,W,G,K,q,J,Y,X;e((()=>{B=t(n(),1),V=t(r(),1),z(),m(),s(),p(),a(),H=o({branchId:d().min(1,`Please select a branch`),number:d().transform(e=>parseInt(e,10)).pipe(l().int().min(1).max(10)),title:d().optional(),slug:d().min(1,`Slug is required`)}),U={title:`Studio/Academics/AddSemesterDialog`,component:L,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{branches:{description:`List of available branches to associate with the semester`,control:`object`},form:{description:`React Hook Form instance`,control:!1},onSubmit:{description:`Function called when the form is submitted`},open:{description:`Whether the dialog is open`,control:`boolean`},onOpenChange:{description:`Function called when the dialog open state changes`},trigger:{description:`Whether to show the default trigger button`,control:`boolean`}},args:{onOpenChange:i(),onSubmit:i()}},W=({mockSubmitting:e=!1,initialData:t,...n})=>{let r=c({resolver:f(H),defaultValues:t||{branchId:``,number:``,title:``,slug:``}}),{watch:i,setValue:a}=r,o=i(`number`);V.useEffect(()=>{o&&(a(`slug`,`semester-${o}`),a(`title`,`Semester ${o}`))},[o,a]);let s={...r,formState:{...r.formState,errors:r.formState.errors,isSubmitting:e}};return(0,B.jsx)(L,{...n,form:s})},G=[{id:`b1`,name:`Computer Engineering`,universityId:{shortName:`MU`}},{id:`b2`,name:`Mechanical Engineering`,universityId:{shortName:`IITB`}},{id:`b3`,name:`Electronics and Telecommunication`,universityId:{shortName:`MU`}}],K={render:e=>(0,B.jsx)(W,{...e}),args:{branches:G,open:!0}},q={render:e=>(0,B.jsx)(W,{...e}),args:{...K.args,mockSubmitting:!0}},J={render:e=>(0,B.jsx)(W,{...e}),args:{...K.args,open:!1}},Y={render:e=>{let t=c({resolver:f(H),defaultValues:{branchId:``,number:``,title:``,slug:``}}),n={...t,formState:{...t.formState,errors:{branchId:{message:`Please select a branch`},number:{message:`Semester number must be between 1 and 10`},slug:{message:`Slug is required`}}}};return(0,B.jsx)(L,{...e,form:n})},args:{...K.args}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    branches: mockBranches,
    open: true
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    open: false
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const form = useForm({
      resolver: zodResolver(semesterSchema),
      defaultValues: {
        branchId: '',
        number: '',
        title: '',
        slug: ''
      }
    });
    const proxiedForm = {
      ...form,
      formState: {
        ...form.formState,
        errors: {
          branchId: {
            message: 'Please select a branch'
          },
          number: {
            message: 'Semester number must be between 1 and 10'
          },
          slug: {
            message: 'Slug is required'
          }
        }
      }
    };
    return <AddSemesterDialogView {...args} form={proxiedForm} />;
  },
  args: {
    ...Default.args
  }
}`,...Y.parameters?.docs?.source}}},X=[`Default`,`Submitting`,`Closed`,`ValidationErrors`]}))();export{J as Closed,K as Default,q as Submitting,Y as ValidationErrors,X as __namedExportsOrder,U as default};