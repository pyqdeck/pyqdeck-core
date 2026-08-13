import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-DSzFGOoK.js";import{n as r,r as i}from"./dist-BvuEP38C.js";import{Bt as a,E as o,J as s,Z as c,i as l,t as u,tt as d}from"./lucide-react-CSsGbmlG.js";import{a as f,i as p,n as m,r as h,t as g}from"./tabs-CXBDVWal.js";var _,v,y,b,x,S,C,w,T;e((()=>{_=t(n(),1),i(),u(),f(),v={title:`UI/Tabs`,component:g,tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`],description:`The orientation of the tabs.`,table:{defaultValue:{summary:`horizontal`}}},onValueChange:{description:`Event handler called when the value changes.`}},args:{onValueChange:r()}},y={render:e=>(0,_.jsxs)(g,{defaultValue:`overview`,...e,className:`w-[600px]`,children:[(0,_.jsxs)(h,{children:[(0,_.jsx)(p,{value:`overview`,children:`Overview`}),(0,_.jsx)(p,{value:`programs`,children:`Programs`}),(0,_.jsx)(p,{value:`admissions`,children:`Admissions`}),(0,_.jsx)(p,{value:`research`,children:`Research`})]}),(0,_.jsxs)(m,{value:`overview`,className:`space-y-4 pt-4`,children:[(0,_.jsx)(`h3`,{className:`text-lg font-medium`,children:`University Overview`}),(0,_.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`Our university is a leading institution dedicated to excellence in teaching, research, and innovation. Founded in 1950, we have a rich history of academic achievement.`})]}),(0,_.jsxs)(m,{value:`programs`,className:`space-y-4 pt-4`,children:[(0,_.jsx)(`h3`,{className:`text-lg font-medium`,children:`Academic Programs`}),(0,_.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`We offer a wide range of undergraduate and postgraduate programs across various disciplines, including Engineering, Sciences, Arts, and Business.`})]}),(0,_.jsxs)(m,{value:`admissions`,className:`space-y-4 pt-4`,children:[(0,_.jsx)(`h3`,{className:`text-lg font-medium`,children:`Admissions`}),(0,_.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`Join our diverse community of scholars. Learn about our admission requirements, application process, and scholarship opportunities.`})]}),(0,_.jsxs)(m,{value:`research`,className:`space-y-4 pt-4`,children:[(0,_.jsx)(`h3`,{className:`text-lg font-medium`,children:`Research & Innovation`}),(0,_.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`Our university is at the forefront of groundbreaking research, addressing global challenges and driving technological advancements.`})]})]})},b={render:e=>(0,_.jsxs)(g,{defaultValue:`overview`,...e,className:`w-[600px]`,children:[(0,_.jsxs)(h,{variant:`line`,children:[(0,_.jsx)(p,{value:`overview`,children:`Overview`}),(0,_.jsx)(p,{value:`faculty`,children:`Faculty`}),(0,_.jsx)(p,{value:`students`,children:`Students`}),(0,_.jsx)(p,{value:`events`,children:`Events`})]}),(0,_.jsx)(m,{value:`overview`,className:`pt-4`,children:`General overview of the department.`}),(0,_.jsx)(m,{value:`faculty`,className:`pt-4`,children:`List of faculty members and their research interests.`}),(0,_.jsx)(m,{value:`students`,className:`pt-4`,children:`Student resources and organizations.`}),(0,_.jsx)(m,{value:`events`,className:`pt-4`,children:`Upcoming departmental events and seminars.`})]})},x={render:e=>(0,_.jsxs)(g,{defaultValue:`all`,...e,className:`w-[600px]`,children:[(0,_.jsxs)(h,{variant:`pill`,children:[(0,_.jsx)(p,{value:`all`,children:`All Departments`}),(0,_.jsx)(p,{value:`engineering`,children:`Engineering`}),(0,_.jsx)(p,{value:`science`,children:`Science`}),(0,_.jsx)(p,{value:`arts`,children:`Arts`})]}),(0,_.jsx)(m,{value:`all`,className:`pt-4`,children:`Showing all university departments.`}),(0,_.jsx)(m,{value:`engineering`,className:`pt-4`,children:`Information about the Faculty of Engineering.`})]})},S={render:e=>(0,_.jsxs)(g,{defaultValue:`general`,...e,orientation:`vertical`,className:`flex w-[600px] gap-6`,children:[(0,_.jsxs)(h,{className:`min-w-[160px]`,children:[(0,_.jsx)(p,{value:`general`,children:`General Settings`}),(0,_.jsx)(p,{value:`academic`,children:`Academic Config`}),(0,_.jsx)(p,{value:`users`,children:`User Management`}),(0,_.jsx)(p,{value:`security`,children:`Security`})]}),(0,_.jsxs)(`div`,{className:`flex-1`,children:[(0,_.jsx)(m,{value:`general`,children:`Manage general university settings and branding.`}),(0,_.jsx)(m,{value:`academic`,children:`Configure semesters, credit systems, and grading scales.`}),(0,_.jsx)(m,{value:`users`,children:`Administer student, faculty, and staff accounts.`}),(0,_.jsx)(m,{value:`security`,children:`Update security protocols and access controls.`})]})]})},C={render:e=>(0,_.jsxs)(g,{defaultValue:`dashboard`,...e,className:`w-[600px]`,children:[(0,_.jsxs)(h,{children:[(0,_.jsxs)(p,{value:`dashboard`,children:[(0,_.jsx)(s,{className:`size-4`}),`Dashboard`]}),(0,_.jsxs)(p,{value:`courses`,children:[(0,_.jsx)(a,{className:`size-4`}),`Courses`]}),(0,_.jsxs)(p,{value:`students`,children:[(0,_.jsx)(l,{className:`size-4`}),`Students`]}),(0,_.jsxs)(p,{value:`settings`,children:[(0,_.jsx)(o,{className:`size-4`}),`Settings`]})]}),(0,_.jsx)(m,{value:`dashboard`,className:`pt-4`,children:`University analytics and metrics dashboard.`}),(0,_.jsx)(m,{value:`courses`,className:`pt-4`,children:`Course catalog and curriculum management.`})]})},w={render:e=>(0,_.jsxs)(g,{defaultValue:`info`,...e,className:`w-[600px]`,children:[(0,_.jsxs)(h,{variant:`line`,children:[(0,_.jsxs)(p,{value:`info`,children:[(0,_.jsx)(c,{className:`size-4`}),`Info`]}),(0,_.jsxs)(p,{value:`graduates`,children:[(0,_.jsx)(d,{className:`size-4`}),`Graduates`]}),(0,_.jsx)(p,{value:`programs`,children:`Programs`})]}),(0,_.jsx)(m,{value:`info`,className:`pt-4`,children:`University basic information.`})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <Tabs defaultValue="overview" {...args} className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="programs">Programs</TabsTrigger>
        <TabsTrigger value="admissions">Admissions</TabsTrigger>
        <TabsTrigger value="research">Research</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">University Overview</h3>
        <p className="text-muted-foreground text-sm">
          Our university is a leading institution dedicated to excellence in
          teaching, research, and innovation. Founded in 1950, we have a rich
          history of academic achievement.
        </p>
      </TabsContent>
      <TabsContent value="programs" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Academic Programs</h3>
        <p className="text-muted-foreground text-sm">
          We offer a wide range of undergraduate and postgraduate programs
          across various disciplines, including Engineering, Sciences, Arts, and
          Business.
        </p>
      </TabsContent>
      <TabsContent value="admissions" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Admissions</h3>
        <p className="text-muted-foreground text-sm">
          Join our diverse community of scholars. Learn about our admission
          requirements, application process, and scholarship opportunities.
        </p>
      </TabsContent>
      <TabsContent value="research" className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Research & Innovation</h3>
        <p className="text-muted-foreground text-sm">
          Our university is at the forefront of groundbreaking research,
          addressing global challenges and driving technological advancements.
        </p>
      </TabsContent>
    </Tabs>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <Tabs defaultValue="overview" {...args} className="w-[600px]">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="faculty">Faculty</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4">
        General overview of the department.
      </TabsContent>
      <TabsContent value="faculty" className="pt-4">
        List of faculty members and their research interests.
      </TabsContent>
      <TabsContent value="students" className="pt-4">
        Student resources and organizations.
      </TabsContent>
      <TabsContent value="events" className="pt-4">
        Upcoming departmental events and seminars.
      </TabsContent>
    </Tabs>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <Tabs defaultValue="all" {...args} className="w-[600px]">
      <TabsList variant="pill">
        <TabsTrigger value="all">All Departments</TabsTrigger>
        <TabsTrigger value="engineering">Engineering</TabsTrigger>
        <TabsTrigger value="science">Science</TabsTrigger>
        <TabsTrigger value="arts">Arts</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="pt-4">
        Showing all university departments.
      </TabsContent>
      <TabsContent value="engineering" className="pt-4">
        Information about the Faculty of Engineering.
      </TabsContent>
    </Tabs>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Tabs defaultValue="general" {...args} orientation="vertical" className="flex w-[600px] gap-6">
      <TabsList className="min-w-[160px]">
        <TabsTrigger value="general">General Settings</TabsTrigger>
        <TabsTrigger value="academic">Academic Config</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general">
          Manage general university settings and branding.
        </TabsContent>
        <TabsContent value="academic">
          Configure semesters, credit systems, and grading scales.
        </TabsContent>
        <TabsContent value="users">
          Administer student, faculty, and staff accounts.
        </TabsContent>
        <TabsContent value="security">
          Update security protocols and access controls.
        </TabsContent>
      </div>
    </Tabs>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <Tabs defaultValue="dashboard" {...args} className="w-[600px]">
      <TabsList>
        <TabsTrigger value="dashboard">
          <LayoutDashboard className="size-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="courses">
          <BookOpen className="size-4" />
          Courses
        </TabsTrigger>
        <TabsTrigger value="students">
          <Users className="size-4" />
          Students
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="size-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="pt-4">
        University analytics and metrics dashboard.
      </TabsContent>
      <TabsContent value="courses" className="pt-4">
        Course catalog and curriculum management.
      </TabsContent>
    </Tabs>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <Tabs defaultValue="info" {...args} className="w-[600px]">
      <TabsList variant="line">
        <TabsTrigger value="info">
          <Info className="size-4" />
          Info
        </TabsTrigger>
        <TabsTrigger value="graduates">
          <GraduationCap className="size-4" />
          Graduates
        </TabsTrigger>
        <TabsTrigger value="programs">Programs</TabsTrigger>
      </TabsList>
      <TabsContent value="info" className="pt-4">
        University basic information.
      </TabsContent>
    </Tabs>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Line`,`Pill`,`Vertical`,`WithIcons`,`MixedIconsAndLabels`]}))();export{y as Default,b as Line,w as MixedIconsAndLabels,x as Pill,S as Vertical,C as WithIcons,T as __namedExportsOrder,v as default};