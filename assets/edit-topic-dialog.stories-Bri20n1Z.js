import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-DLJV3Qbr.js";import{a as i,i as a,n as o,r as s,t as c}from"./dist-BvuEP38C.js";import{a as l,c as u,d,i as f,l as p,o as m,s as h,t as g,u as _}from"./zod-CPqXFO7E.js";import{Gt as v,t as y}from"./lucide-react-BdVUdILY.js";import{r as b,t as x}from"./button-Cc5dP0bb.js";import{a as S,d as C,i as w,o as T,t as E}from"./field-CgV6MfzY.js";import{n as D,t as O}from"./input-KsebDKUT.js";import{a as k,c as A,i as j,n as M,o as N,r as P,t as F}from"./dialog-BPfiSCNu.js";import{n as I,t as L}from"./textarea-CKEUDc5G.js";function R({form:e,onSubmit:t,open:n,onOpenChange:r}){let{control:i,handleSubmit:a,formState:{errors:o={},isSubmitting:s=!1}={}}=e||{};return(0,z.jsx)(F,{open:n,onOpenChange:r,children:(0,z.jsxs)(M,{className:`border-2 shadow-none sm:max-w-[450px]`,children:[(0,z.jsxs)(k,{children:[(0,z.jsxs)(`div`,{className:`mb-2 flex items-center gap-3`,children:[(0,z.jsx)(`div`,{className:`bg-primary/10 text-primary rounded-lg p-2`,children:(0,z.jsx)(v,{className:`h-5 w-5`})}),(0,z.jsx)(N,{className:`font-roboto text-xl font-bold`,children:`Edit Learning Topic`})]}),(0,z.jsx)(P,{className:`font-roboto text-sm`,children:`Update the title or details of this specific learning point.`})]}),(0,z.jsxs)(`form`,{onSubmit:a(t),className:`py-4`,children:[(0,z.jsxs)(S,{children:[(0,z.jsxs)(`div`,{className:`grid grid-cols-3 gap-4`,children:[(0,z.jsx)(`div`,{className:`col-span-2`,children:(0,z.jsxs)(E,{"data-invalid":!!o.title,children:[(0,z.jsx)(T,{className:`font-roboto font-bold`,children:`Topic Title`}),(0,z.jsx)(p,{name:`title`,control:i,render:({field:e})=>(0,z.jsx)(O,{...e,className:`font-roboto border-2 focus-visible:ring-0`,"aria-invalid":!!o.title})}),(0,z.jsx)(w,{errors:[o.title]})]})}),(0,z.jsxs)(E,{"data-invalid":!!o.order,children:[(0,z.jsx)(T,{className:`font-roboto font-bold`,children:`Order`}),(0,z.jsx)(p,{name:`order`,control:i,render:({field:e})=>(0,z.jsx)(O,{...e,type:`number`,className:`font-roboto border-2 text-center focus-visible:ring-0`,onChange:t=>e.onChange(parseInt(t.target.value)||0),"aria-invalid":!!o.order})}),(0,z.jsx)(w,{errors:[o.order]})]})]}),(0,z.jsxs)(E,{"data-invalid":!!o.description,children:[(0,z.jsx)(T,{className:`font-roboto font-bold`,children:`Details (Optional)`}),(0,z.jsx)(p,{name:`description`,control:i,render:({field:e})=>(0,z.jsx)(L,{...e,className:`font-roboto min-h-[80px] resize-none border-2 focus-visible:ring-0`,"aria-invalid":!!o.description})}),(0,z.jsx)(w,{errors:[o.description]})]})]}),(0,z.jsx)(j,{className:`pt-6`,children:(0,z.jsx)(x,{type:`submit`,disabled:s,className:`font-roboto bg-primary hover:bg-primary/90 h-11 w-full border-2 font-bold shadow-none`,children:s?`Saving...`:`Update Topic`})})]})]})})}var z,B=e((()=>{z=t(n(),1),r(),y(),_(),b(),A(),D(),I(),C(),R.__docgenInfo={description:``,methods:[],displayName:`EditTopicDialogView`}})),V,H,U,W,G,K,q,J,Y;e((()=>{V=t(n(),1),B(),_(),u(),g(),s(),H=l({title:m().min(1,`Title is required`).max(200),description:m().max(1e3).optional().nullable(),order:f().int().default(0)}),U={title:`Studio/Academics/EditTopicDialog`,component:R,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{open:{control:`boolean`,description:`Whether the dialog is open`,table:{defaultValue:{summary:`false`}}},onOpenChange:{description:`Callback when open state changes`},onSubmit:{description:`Form submission handler`},form:{control:!1,description:`React Hook Form instance`}}},W=({mockSubmitting:e=!1,initialData:t,...n})=>{let r=d({resolver:h(H),defaultValues:t||{title:``,description:``,order:0}}),i={...r,formState:{...r.formState,isSubmitting:e}};return(0,V.jsx)(R,{...n,form:i})},G={title:`Backpropagation Algorithm`,description:`Detailed explanation of the backpropagation algorithm in neural networks, including partial derivatives and weight updates.`,order:4},K={render:e=>(0,V.jsx)(W,{...e}),args:{open:!0,initialData:G,onOpenChange:o(),onSubmit:o()}},q={render:e=>(0,V.jsx)(W,{...e}),args:{...K.args,mockSubmitting:!0}},J={render:e=>(0,V.jsx)(W,{...e}),args:{...K.args,initialData:{title:``,description:`A`.repeat(1001),order:0}},play:async({canvasElement:e})=>{let t=i(e),n=t.getByRole(`button`,{name:/update topic/i});await a.click(n),await c(t.getByText(/title is required/i)).toBeInTheDocument(),await c(t.getByText(/string must contain at most 1000 character/i)).toBeInTheDocument()}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => <FormWrapper {...args} />,
  args: {
    open: true,
    initialData: mockTopic,
    onOpenChange: fn(),
    onSubmit: fn()
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
    initialData: {
      title: '',
      description: 'A'.repeat(1001),
      order: 0
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', {
      name: /update topic/i
    });
    await userEvent.click(submitButton);
    await expect(canvas.getByText(/title is required/i)).toBeInTheDocument();
    await expect(canvas.getByText(/string must contain at most 1000 character/i)).toBeInTheDocument();
  }
}`,...J.parameters?.docs?.source}}},Y=[`Default`,`Submitting`,`ValidationErrors`]}))();export{K as Default,q as Submitting,J as ValidationErrors,Y as __namedExportsOrder,U as default};