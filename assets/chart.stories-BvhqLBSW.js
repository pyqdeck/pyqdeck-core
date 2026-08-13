import{n as e,s as t}from"./chunk-CzyJ72yW.js";import{Br as n}from"./iframe-r4TTtUCK.js";import{_ as r,a as i,c as a,d as o,f as s,g as c,h as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as _,t as v,u as y,v as b,y as x}from"./chart-CAYRkxhn.js";var S,C,w,T,E,D,O,k,A,j,M;e((()=>{S=t(n(),1),m(),_(),C={title:`UI/Chart`,component:v,tags:[`autodocs`],argTypes:{config:{control:`object`,description:`Configuration for the chart colors and labels`},initialDimension:{control:`object`,description:`Initial dimensions for the chart container`}}},w=[{month:`Jan`,papers:186,downloads:800},{month:`Feb`,papers:305,downloads:2e3},{month:`Mar`,papers:237,downloads:1200},{month:`Apr`,papers:173,downloads:1900},{month:`May`,papers:209,downloads:1300},{month:`Jun`,papers:214,downloads:1400}],T={papers:{label:`Papers Uploaded`,color:`var(--primary)`},downloads:{label:`Downloads`,color:`var(--chart-2)`}},E=[{category:`engineering`,count:400,fill:`var(--color-engineering)`},{category:`science`,count:300,fill:`var(--color-science)`},{category:`arts`,count:300,fill:`var(--color-arts)`},{category:`commerce`,count:200,fill:`var(--color-commerce)`}],D={count:{label:`Papers`},engineering:{label:`Engineering`,color:`var(--chart-1)`},science:{label:`Science`,color:`var(--chart-2)`},arts:{label:`Arts`,color:`var(--chart-3)`},commerce:{label:`Commerce`,color:`var(--chart-4)`}},O={render:e=>(0,S.jsx)(`div`,{className:`h-[400px] w-full max-w-2xl`,children:(0,S.jsx)(v,{...e,children:(0,S.jsxs)(y,{data:w,children:[(0,S.jsx)(r,{vertical:!1}),(0,S.jsx)(h,{dataKey:`month`,tickLine:!1,tickMargin:10,axisLine:!1}),(0,S.jsx)(s,{tickLine:!1,axisLine:!1,tickMargin:10}),(0,S.jsx)(u,{content:(0,S.jsx)(i,{})}),(0,S.jsx)(p,{content:(0,S.jsx)(g,{})}),(0,S.jsx)(f,{dataKey:`papers`,fill:`var(--color-papers)`,radius:4}),(0,S.jsx)(f,{dataKey:`downloads`,fill:`var(--color-downloads)`,radius:4})]})})}),args:{config:T}},k={render:e=>(0,S.jsx)(`div`,{className:`h-[400px] w-full max-w-2xl`,children:(0,S.jsx)(v,{...e,children:(0,S.jsxs)(o,{data:w,children:[(0,S.jsx)(r,{vertical:!1}),(0,S.jsx)(h,{dataKey:`month`,tickLine:!1,tickMargin:10,axisLine:!1}),(0,S.jsx)(s,{tickLine:!1,axisLine:!1,tickMargin:10}),(0,S.jsx)(u,{content:(0,S.jsx)(i,{})}),(0,S.jsx)(p,{content:(0,S.jsx)(g,{})}),(0,S.jsx)(c,{type:`monotone`,dataKey:`papers`,stroke:`var(--color-papers)`,strokeWidth:2,dot:!1}),(0,S.jsx)(c,{type:`monotone`,dataKey:`downloads`,stroke:`var(--color-downloads)`,strokeWidth:2,dot:!1})]})})}),args:{config:T}},A={render:e=>(0,S.jsx)(`div`,{className:`h-[400px] w-full max-w-2xl`,children:(0,S.jsx)(v,{...e,children:(0,S.jsxs)(a,{data:w,children:[(0,S.jsx)(r,{vertical:!1}),(0,S.jsx)(h,{dataKey:`month`,tickLine:!1,tickMargin:10,axisLine:!1}),(0,S.jsx)(s,{tickLine:!1,axisLine:!1,tickMargin:10}),(0,S.jsx)(u,{content:(0,S.jsx)(i,{})}),(0,S.jsx)(p,{content:(0,S.jsx)(g,{})}),(0,S.jsx)(l,{type:`monotone`,dataKey:`papers`,fill:`var(--color-papers)`,fillOpacity:.4,stroke:`var(--color-papers)`}),(0,S.jsx)(l,{type:`monotone`,dataKey:`downloads`,fill:`var(--color-downloads)`,fillOpacity:.4,stroke:`var(--color-downloads)`})]})})}),args:{config:T}},j={render:e=>(0,S.jsx)(`div`,{className:`h-[400px] w-full max-w-2xl`,children:(0,S.jsx)(v,{...e,children:(0,S.jsxs)(d,{children:[(0,S.jsx)(u,{content:(0,S.jsx)(i,{hideLabel:!0})}),(0,S.jsx)(b,{data:E,dataKey:`count`,nameKey:`category`,innerRadius:60,strokeWidth:5,children:E.map((e,t)=>(0,S.jsx)(x,{fill:e.fill},`cell-${t}`))}),(0,S.jsx)(p,{content:(0,S.jsx)(g,{nameKey:`category`}),className:`-translate-y-2 flex-wrap`})]})})}),args:{config:D}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <BarChart data={academicData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="papers" fill="var(--color-papers)" radius={4} />
          <Bar dataKey="downloads" fill="var(--color-downloads)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>,
  args: {
    config: academicConfig
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <LineChart data={academicData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="papers" stroke="var(--color-papers)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="downloads" stroke="var(--color-downloads)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>,
  args: {
    config: academicConfig
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <AreaChart data={academicData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area type="monotone" dataKey="papers" fill="var(--color-papers)" fillOpacity={0.4} stroke="var(--color-papers)" />
          <Area type="monotone" dataKey="downloads" fill="var(--color-downloads)" fillOpacity={0.4} stroke="var(--color-downloads)" />
        </AreaChart>
      </ChartContainer>
    </div>,
  args: {
    config: academicConfig
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[400px] w-full max-w-2xl">
      <ChartContainer {...args}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={categoryData} dataKey="count" nameKey="category" innerRadius={60} strokeWidth={5}>
            {categoryData.map((entry, index) => <Cell key={\`cell-\${index}\`} fill={entry.fill} />)}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap" />
        </PieChart>
      </ChartContainer>
    </div>,
  args: {
    config: categoryConfig
  }
}`,...j.parameters?.docs?.source}}},M=[`BarChartVariant`,`LineChartVariant`,`AreaChartVariant`,`PieChartVariant`]}))();export{A as AreaChartVariant,O as BarChartVariant,k as LineChartVariant,j as PieChartVariant,M as __namedExportsOrder,C as default};