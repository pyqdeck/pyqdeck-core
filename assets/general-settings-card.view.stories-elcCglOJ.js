import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n,Ci as r}from"./iframe-Dj9kFMWJ.js";import{n as i,r as a}from"./dist-BvuEP38C.js";import{k as o,t as s}from"./lucide-react-L7eFyXr_.js";import{n as c,t as l}from"./label-BMGc_qE-.js";import{n as u,t as d}from"./switch-BsvCTRgE.js";import{c as f,i as p,o as m,r as h,s as g,t as _}from"./card-CMYCLG9w.js";function v({id:e,label:t,description:n,checked:r,disabled:i,onToggle:a}){return(0,b.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,b.jsxs)(`div`,{className:`flex-1`,children:[(0,b.jsx)(l,{htmlFor:e,className:`font-roboto cursor-pointer text-sm font-medium`,children:t}),(0,b.jsx)(`p`,{className:`text-muted-foreground font-roboto mt-0.5 text-xs`,children:n})]}),(0,b.jsx)(d,{id:e,checked:r,disabled:i,onCheckedChange:a})]})}function y({settings:e,isUpdating:t,onToggle:n}){return(0,b.jsxs)(_,{className:`font-roboto`,children:[(0,b.jsxs)(m,{children:[(0,b.jsxs)(g,{className:`flex items-center gap-2`,children:[(0,b.jsx)(o,{className:`h-5 w-5`}),`General Settings`]}),(0,b.jsx)(p,{children:`Platform-wide operational flags.`})]}),(0,b.jsxs)(h,{className:`flex flex-col gap-5`,children:[(0,b.jsx)(v,{id:`devMode`,label:`Developer Mode`,description:`Enables debug logs and dev tooling across the platform.`,checked:e.devMode,disabled:t===`devMode`,onToggle:e=>n(`devMode`,e)}),(0,b.jsx)(v,{id:`contentFreeze`,label:`Content Freeze`,description:`Blocks all new papers and questions from being created by editors.`,checked:e.contentFreeze,disabled:t===`contentFreeze`,onToggle:e=>n(`contentFreeze`,e)}),(0,b.jsx)(v,{id:`maintenanceMode`,label:`Maintenance Mode`,description:`Signals that the platform is undergoing maintenance.`,checked:e.maintenanceMode,disabled:t===`maintenanceMode`,onToggle:e=>n(`maintenanceMode`,e)})]})]})}var b,x=e((()=>{b=t(n(),1),r(),s(),f(),u(),c(),y.__docgenInfo={description:``,methods:[],displayName:`GeneralSettingsCardView`}})),S,C,w,T,E,D,O,k;e((()=>{a(),x(),S={title:`Studio/Settings/GeneralSettingsCard`,component:y,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`GeneralSettingsCardView provides a UI for toggling platform-wide operational flags.
It displays developer mode, content freeze, and maintenance mode settings.`}}},argTypes:{settings:{control:`object`,description:`The current state of platform-wide operational flags`,table:{type:{summary:`object`,detail:`{ devMode: boolean, contentFreeze: boolean, maintenanceMode: boolean }`}}},isUpdating:{control:{type:`select`},options:[null,`devMode`,`contentFreeze`,`maintenanceMode`],description:`Indicates which setting is currently being updated`,table:{type:{summary:`string | null`},defaultValue:{summary:`null`}}},onToggle:{description:`Callback function triggered when a setting is toggled`,table:{type:{summary:`(key: string, value: boolean) => void`}}}},args:{onToggle:i()}},C={devMode:!1,contentFreeze:!1,maintenanceMode:!1},w={args:{settings:C,isUpdating:null}},T={args:{settings:{devMode:!0,contentFreeze:!0,maintenanceMode:!0},isUpdating:null}},E={args:{settings:C,isUpdating:`devMode`}},D={args:{settings:C,isUpdating:`contentFreeze`}},O={args:{settings:C,isUpdating:`maintenanceMode`}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: null
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    settings: {
      devMode: true,
      contentFreeze: true,
      maintenanceMode: true
    },
    isUpdating: null
  }
}`,...T.parameters?.docs?.source},description:{story:`Visualizes the card when all platform-wide flags are enabled.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: 'devMode'
  }
}`,...E.parameters?.docs?.source},description:{story:`Demonstrates the loading state when the Developer Mode setting is being updated.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: 'contentFreeze'
  }
}`,...D.parameters?.docs?.source},description:{story:`Demonstrates the loading state when the Content Freeze setting is being updated.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    settings: defaultSettings,
    isUpdating: 'maintenanceMode'
  }
}`,...O.parameters?.docs?.source},description:{story:`Demonstrates the loading state when the Maintenance Mode setting is being updated.`,...O.parameters?.docs?.description}}},k=[`Default`,`AllEnabled`,`UpdatingDevMode`,`UpdatingContentFreeze`,`UpdatingMaintenanceMode`]}))();export{T as AllEnabled,w as Default,D as UpdatingContentFreeze,E as UpdatingDevMode,O as UpdatingMaintenanceMode,k as __namedExportsOrder,S as default};