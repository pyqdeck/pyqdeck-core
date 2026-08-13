import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-Dj9kFMWJ.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{F as a,Gt as o,H as s,J as c,Lt as l,N as u,Tt as d,W as f,bt as p,m,o as h,ot as g,t as _}from"./lucide-react-L7eFyXr_.js";import{r as v,t as y}from"./button-SXKX9Jta.js";import{a as b,c as x,d as S,f as C,g as w,h as T,i as E,l as D,m as O,n as k,o as A,p as j,r as M,s as N,t as P,u as F}from"./dropdown-menu-DaAUbqz4.js";var I,L,R,z,B,V,H;e((()=>{I=t(n(),1),i(),w(),v(),_(),L={title:`UI/DropdownMenu`,component:P,tags:[`autodocs`],argTypes:{open:{control:`boolean`,description:`The open state of the dropdown menu`,table:{defaultValue:{summary:`false`}}},onOpenChange:{description:`Event handler called when the open state changes`,table:{category:`Events`}},modal:{control:`boolean`,description:`Whether the dropdown menu should be modal`,table:{defaultValue:{summary:`true`}}}},args:{onOpenChange:r()},parameters:{layout:`centered`}},R=e=>(0,I.jsxs)(P,{...e,children:[(0,I.jsx)(T,{asChild:!0,children:(0,I.jsx)(y,{variant:`outline`,children:`Open Menu`})}),(0,I.jsxs)(M,{className:`w-56`,children:[(0,I.jsx)(A,{children:`Manage Academics`}),(0,I.jsx)(F,{}),(0,I.jsxs)(E,{children:[(0,I.jsxs)(b,{children:[(0,I.jsx)(u,{className:`size-4`}),(0,I.jsx)(`span`,{children:`University Settings`}),(0,I.jsx)(S,{children:`⇧⌘U`})]}),(0,I.jsxs)(b,{children:[(0,I.jsx)(g,{className:`size-4`}),(0,I.jsx)(`span`,{children:`Branch Management`}),(0,I.jsx)(S,{children:`⌘B`})]}),(0,I.jsxs)(b,{children:[(0,I.jsx)(l,{className:`size-4`}),(0,I.jsx)(`span`,{children:`Semester Config`}),(0,I.jsx)(S,{children:`⌘S`})]})]}),(0,I.jsx)(F,{}),(0,I.jsxs)(E,{children:[(0,I.jsxs)(b,{children:[(0,I.jsx)(o,{className:`size-4`}),(0,I.jsx)(`span`,{children:`Subject Offerings`})]}),(0,I.jsxs)(C,{children:[(0,I.jsxs)(O,{children:[(0,I.jsx)(h,{className:`size-4`}),(0,I.jsx)(`span`,{children:`Invite Faculty`})]}),(0,I.jsx)(N,{children:(0,I.jsxs)(j,{children:[(0,I.jsxs)(b,{children:[(0,I.jsx)(f,{className:`size-4`}),(0,I.jsx)(`span`,{children:`Email Invitation`})]}),(0,I.jsxs)(b,{children:[(0,I.jsx)(s,{className:`size-4`}),(0,I.jsx)(`span`,{children:`SMS Invitation`})]}),(0,I.jsx)(F,{}),(0,I.jsxs)(b,{children:[(0,I.jsx)(d,{className:`size-4`}),(0,I.jsx)(`span`,{children:`More Options...`})]})]})})]}),(0,I.jsxs)(b,{children:[(0,I.jsx)(a,{className:`size-4`}),(0,I.jsx)(`span`,{children:`New Course`}),(0,I.jsx)(S,{children:`⌘+N`})]})]}),(0,I.jsx)(F,{}),(0,I.jsxs)(b,{children:[(0,I.jsx)(c,{className:`size-4`}),(0,I.jsx)(`span`,{children:`System Support`})]}),(0,I.jsxs)(b,{disabled:!0,children:[(0,I.jsx)(p,{className:`size-4`}),(0,I.jsx)(`span`,{children:`AI Analytics`})]}),(0,I.jsx)(F,{}),(0,I.jsxs)(b,{variant:`destructive`,children:[(0,I.jsx)(m,{className:`size-4`}),(0,I.jsx)(`span`,{children:`Delete Records`}),(0,I.jsx)(S,{children:`⇧⌘D`})]})]})]}),z={render:R,args:{}},B={render:e=>(0,I.jsxs)(P,{...e,children:[(0,I.jsx)(T,{asChild:!0,children:(0,I.jsx)(y,{variant:`outline`,children:`Switch Context`})}),(0,I.jsxs)(M,{className:`w-56`,children:[(0,I.jsx)(A,{children:`Scope Level`}),(0,I.jsx)(F,{}),(0,I.jsxs)(x,{value:`university`,children:[(0,I.jsx)(D,{value:`university`,children:`University Level`}),(0,I.jsx)(D,{value:`branch`,children:`Branch Level`}),(0,I.jsx)(D,{value:`semester`,children:`Semester Level`})]})]})]}),args:{}},V={render:e=>(0,I.jsxs)(P,{...e,children:[(0,I.jsx)(T,{asChild:!0,children:(0,I.jsx)(y,{variant:`outline`,children:`Display Settings`})}),(0,I.jsxs)(M,{className:`w-56`,children:[(0,I.jsx)(A,{children:`View Options`}),(0,I.jsx)(F,{}),(0,I.jsx)(k,{checked:!0,children:`Show Completed Semesters`}),(0,I.jsx)(k,{children:`Show Inactive Branches`}),(0,I.jsx)(k,{checked:!0,children:`Show Faculty Avatars`}),(0,I.jsx)(F,{}),(0,I.jsx)(k,{disabled:!0,children:`Include Analytics Data`})]})]}),args:{}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {}
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Switch Context</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Scope Level</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="university">
          <DropdownMenuRadioItem value="university">
            University Level
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="branch">
            Branch Level
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="semester">
            Semester Level
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>,
  args: {}
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Display Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Show Completed Semesters
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          Show Inactive Branches
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Show Faculty Avatars
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem disabled>
          Include Analytics Data
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  args: {}
}`,...V.parameters?.docs?.source}}},H=[`Default`,`RadioGroup`,`Checkboxes`]}))();export{V as Checkboxes,z as Default,B as RadioGroup,H as __namedExportsOrder,L as default};