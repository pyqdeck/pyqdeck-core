import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-RBDcsRzV.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{X as o,t as s,zt as c}from"./lucide-react-CMOPidbD.js";import{r as l,t as u}from"./button-BXt1raUX.js";import{n as d,t as f}from"./label-DND7vpl-.js";import{n as p,t as m}from"./input-D2yXDsph.js";import{n as h,t as g}from"./switch-DmDKV3s-.js";import{c as _,i as v,l as y,n as b,s as x,t as S}from"./select-oGjk6zHW.js";import{a as C,c as w,i as T,o as E,r as D,s as O,t as k}from"./card-BWcj9ctO.js";function A({form:e,hasApiKey:t,isSaving:n,onFormChange:r,onClearApiKey:i,onSave:a}){return(0,j.jsxs)(k,{className:`font-roboto flex flex-col`,children:[(0,j.jsx)(E,{children:(0,j.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsxs)(O,{className:`flex items-center gap-2`,children:[(0,j.jsx)(c,{className:`h-5 w-5`}),`AI Configuration`]}),(0,j.jsx)(T,{className:`mt-1`,children:`Configure the AI provider for future AI-powered features.`})]}),(0,j.jsx)(g,{id:`aiEnabled`,checked:e.enabled,onCheckedChange:e=>r(`enabled`,e)})]})}),(0,j.jsxs)(D,{className:`flex flex-1 flex-col gap-4`,children:[(0,j.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[(0,j.jsx)(f,{className:`font-roboto`,children:`Provider`}),(0,j.jsxs)(S,{value:e.provider,onValueChange:e=>r(`provider`,e),children:[(0,j.jsx)(x,{className:`font-roboto`,children:(0,j.jsx)(_,{})}),(0,j.jsxs)(b,{className:`font-roboto`,children:[(0,j.jsx)(v,{value:`openai`,children:`OpenAI`}),(0,j.jsx)(v,{value:`openai-compatible`,children:`OpenAI-Compatible (Ollama, LiteLLM, etc.)`}),(0,j.jsx)(v,{value:`anthropic`,children:`Anthropic`})]})]})]}),(0,j.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[(0,j.jsx)(f,{className:`font-roboto`,children:`API Key`}),(0,j.jsx)(m,{type:`password`,className:`font-roboto`,placeholder:t?`Key saved — type to replace`:`Enter API key`,value:e.apiKey,onChange:e=>r(`apiKey`,e.target.value),autoComplete:`new-password`}),t&&!e.apiKey&&(0,j.jsxs)(`div`,{className:`text-muted-foreground flex items-center justify-between text-xs`,children:[(0,j.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,j.jsx)(o,{className:`h-3 w-3`}),`API key is saved. Leave blank to keep it unchanged.`]}),(0,j.jsx)(`button`,{type:`button`,onClick:i,className:`text-destructive hover:underline`,children:`Clear key`})]})]}),e.provider===`openai-compatible`&&(0,j.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[(0,j.jsx)(f,{className:`font-roboto`,children:`Base URL`}),(0,j.jsx)(m,{className:`font-roboto`,placeholder:`http://localhost:11434/v1`,value:e.baseUrl??``,onChange:e=>r(`baseUrl`,e.target.value||null)})]}),(0,j.jsxs)(`div`,{className:`flex flex-col gap-1.5`,children:[(0,j.jsx)(f,{className:`font-roboto`,children:`Model`}),(0,j.jsx)(m,{className:`font-roboto`,placeholder:`e.g. gpt-4o, claude-sonnet-4-6, llama3`,value:e.model??``,onChange:e=>r(`model`,e.target.value||null)})]})]}),(0,j.jsx)(C,{children:(0,j.jsx)(u,{onClick:a,disabled:n,className:`font-roboto w-full font-bold`,children:n?`Saving...`:`Save AI Config`})})]})}var j,M=e((()=>{j=t(n(),1),r(),s(),w(),l(),p(),d(),h(),y(),A.__docgenInfo={description:``,methods:[],displayName:`AiConfigCardView`}})),N,P,F,I,L,R,z,B,V,H,U,W;e((()=>{N=t(n(),1),a(),P=t(r(),1),M(),F={title:`Studio/Settings/AiConfigCardView`,component:A,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`AiConfigCardView allows administrators to configure AI provider settings,
including enabling/disabling AI features, selecting a provider, and managing API keys.`}}},argTypes:{form:{control:`object`,description:`The current state of the AI configuration form`,table:{type:{summary:`object`,detail:`{ enabled: boolean, provider: string, apiKey: string, baseUrl: string | null, model: string | null }`}}},hasApiKey:{control:`boolean`,description:`Indicates if an API key is already saved in the backend`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},isSaving:{control:`boolean`,description:`Indicates if the configuration is currently being saved`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},onFormChange:{description:`Callback triggered when a form field value changes`,table:{type:{summary:`(key: string, value: any) => void`}}},onClearApiKey:{description:`Callback triggered when the "Clear key" button is clicked`,table:{type:{summary:`() => void`}}},onSave:{description:`Callback triggered when the "Save AI Config" button is clicked`,table:{type:{summary:`() => void`}}}},args:{onFormChange:i(),onClearApiKey:i(),onSave:i()}},I=({initialForm:e,initialHasApiKey:t=!1,...n})=>{let[r,i]=(0,P.useState)(e),[a,o]=(0,P.useState)(t),s=(e,t)=>{i(n=>({...n,[e]:t})),n.onFormChange(e,t)},c=()=>{o(!1),i(e=>({...e,apiKey:``})),n.onClearApiKey()};return(0,N.jsx)(`div`,{className:`w-[500px]`,children:(0,N.jsx)(A,{...n,form:r,hasApiKey:a,onFormChange:s,onClearApiKey:c})})},L={enabled:!1,provider:`openai`,apiKey:``,baseUrl:null,model:`gpt-4o`},R={render:e=>(0,N.jsx)(I,{...e}),args:{initialForm:L,hasApiKey:!1,isSaving:!1}},z={render:e=>(0,N.jsx)(I,{...e}),args:{initialForm:{...L,enabled:!0,model:`gpt-4o`},initialHasApiKey:!0}},B={render:e=>(0,N.jsx)(I,{...e}),args:{initialForm:{...L,enabled:!0,provider:`openai-compatible`,baseUrl:`http://localhost:11434/v1`,model:`llama3`}}},V={render:e=>(0,N.jsx)(I,{...e}),args:{initialForm:{...L,enabled:!0,provider:`anthropic`,model:`claude-3-5-sonnet-20240620`}}},H={render:e=>(0,N.jsx)(I,{...e}),args:{initialForm:{...L,enabled:!0},isSaving:!0}},U={render:e=>(0,N.jsx)(I,{...e}),args:{initialForm:{...L,enabled:!0,apiKey:``},initialHasApiKey:!0}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveWrapper {...args} />,
  args: {
    initialForm: defaultForm,
    hasApiKey: false,
    isSaving: false
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      model: 'gpt-4o'
    },
    initialHasApiKey: true
  }
}`,...z.parameters?.docs?.source},description:{story:`Demonstrates the configuration for OpenAI with AI features enabled.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3'
    }
  }
}`,...B.parameters?.docs?.source},description:{story:`Demonstrates the configuration for an OpenAI-compatible provider (e.g., Ollama).
This view includes an additional "Base URL" field.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-20240620'
    }
  }
}`,...V.parameters?.docs?.source},description:{story:`Demonstrates the configuration for Anthropic.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true
    },
    isSaving: true
  }
}`,...H.parameters?.docs?.source},description:{story:`Visualizes the card in a saving state.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => <InteractiveWrapper {...args} />,
  args: {
    initialForm: {
      ...defaultForm,
      enabled: true,
      apiKey: ''
    },
    initialHasApiKey: true
  }
}`,...U.parameters?.docs?.source},description:{story:`Demonstrates the state where an API key is already saved in the backend.`,...U.parameters?.docs?.description}}},W=[`Default`,`EnabledOpenAI`,`OpenAICompatible`,`Anthropic`,`Saving`,`WithSavedKey`]}))();export{V as Anthropic,R as Default,z as EnabledOpenAI,B as OpenAICompatible,H as Saving,U as WithSavedKey,W as __namedExportsOrder,F as default};