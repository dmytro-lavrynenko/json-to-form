import { useState } from 'react'
import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

type TabsProps = {
  tabs: TabItem[]
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id)

  return (
    <div className="max-w-full max-h-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 -mb-px text-sm font-medium rounded-t-lg ${
            activeTab === tab.id
              ? 'text-blue-600 bg-white'
              : 'text-gray-500 hover:text-gray-700 bg-gray-200 cursor-pointer'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <div className="bg-white rounded-b-lg rounded-tr-lg text-black p-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
