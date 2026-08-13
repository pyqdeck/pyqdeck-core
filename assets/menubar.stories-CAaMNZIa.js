import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-_w7TdDlw.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{a,c as o,d as s,f as c,h as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as _,t as v,u as y}from"./menubar-CSSipBCe.js";var b,x,S,C,w;e((()=>{b=t(n(),1),i(),l(),x={title:`UI/Menubar`,component:v,tags:[`autodocs`],argTypes:{className:{control:`text`,description:`Additional CSS classes for the menubar.`}},parameters:{docs:{description:{component:`A horizontal menu bar typically visible at the top of an application, contains buttons that open menus.`}}}},S={render:e=>(0,b.jsxs)(v,{...e,children:[(0,b.jsxs)(m,{children:[(0,b.jsx)(f,{children:`File`}),(0,b.jsxs)(g,{children:[(0,b.jsxs)(u,{onSelect:r(),children:[`New Tab `,(0,b.jsx)(y,{children:`⌘T`})]}),(0,b.jsxs)(u,{onSelect:r(),children:[`New Window `,(0,b.jsx)(y,{children:`⌘N`})]}),(0,b.jsx)(u,{disabled:!0,onSelect:r(),children:`New Incognito Window`}),(0,b.jsx)(d,{}),(0,b.jsx)(u,{onSelect:r(),children:`Share`}),(0,b.jsx)(d,{}),(0,b.jsx)(u,{onSelect:r(),children:`Print`})]})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(f,{children:`Edit`}),(0,b.jsxs)(g,{children:[(0,b.jsx)(u,{onSelect:r(),children:`Undo`}),(0,b.jsx)(u,{onSelect:r(),children:`Redo`})]})]})]}),args:{}},C={render:e=>(0,b.jsxs)(v,{...e,children:[(0,b.jsxs)(m,{children:[(0,b.jsx)(f,{children:`Academics`}),(0,b.jsxs)(g,{children:[(0,b.jsxs)(u,{onSelect:r(),children:[`New Branch `,(0,b.jsx)(y,{children:`⌘N`})]}),(0,b.jsxs)(u,{onSelect:r(),children:[`Import CSV `,(0,b.jsx)(y,{children:`⌘I`})]}),(0,b.jsx)(d,{}),(0,b.jsxs)(s,{children:[(0,b.jsx)(h,{children:`Syllabus`}),(0,b.jsxs)(c,{children:[(0,b.jsx)(u,{onSelect:r(),children:`View All`}),(0,b.jsx)(u,{onSelect:r(),children:`Export PDF`})]})]}),(0,b.jsx)(d,{}),(0,b.jsx)(u,{variant:`destructive`,onSelect:r(),children:`Delete All Data`})]})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(f,{children:`View`}),(0,b.jsxs)(g,{children:[(0,b.jsx)(p,{onSelect:r(),children:`Show Sidebar`}),(0,b.jsx)(p,{checked:!0,onSelect:r(),children:`Show Analytics`}),(0,b.jsx)(d,{}),(0,b.jsxs)(u,{inset:!0,onSelect:r(),children:[`Reload `,(0,b.jsx)(y,{children:`⌘R`})]})]})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(f,{children:`Profiles`}),(0,b.jsx)(g,{children:(0,b.jsxs)(_,{value:`admin`,children:[(0,b.jsx)(a,{inset:!0,children:`Role`}),(0,b.jsx)(d,{}),(0,b.jsx)(o,{value:`admin`,onSelect:r(),children:`Admin`}),(0,b.jsx)(o,{value:`moderator`,onSelect:r(),children:`Moderator`}),(0,b.jsx)(o,{value:`student`,onSelect:r(),children:`Student`})]})})]})]}),args:{className:`w-fit`}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={fn()}>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={fn()}>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled onSelect={fn()}>
            New Incognito Window
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={fn()}>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={fn()}>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={fn()}>Undo</MenubarItem>
          <MenubarItem onSelect={fn()}>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>,
  args: {}
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>Academics</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={fn()}>
            New Branch <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={fn()}>
            Import CSV <MenubarShortcut>⌘I</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Syllabus</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onSelect={fn()}>View All</MenubarItem>
              <MenubarItem onSelect={fn()}>Export PDF</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive" onSelect={fn()}>
            Delete All Data
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem onSelect={fn()}>
            Show Sidebar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked onSelect={fn()}>
            Show Analytics
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset onSelect={fn()}>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="admin">
            <MenubarLabel inset>Role</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioItem value="admin" onSelect={fn()}>
              Admin
            </MenubarRadioItem>
            <MenubarRadioItem value="moderator" onSelect={fn()}>
              Moderator
            </MenubarRadioItem>
            <MenubarRadioItem value="student" onSelect={fn()}>
              Student
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>,
  args: {
    className: 'w-fit'
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Complex`]}))();export{C as Complex,S as Default,w as __namedExportsOrder,x as default};