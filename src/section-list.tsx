import React from 'react';
import { SectionListProps, UniqueData } from './propsModels';
import { useSectionList } from './hooks/useSectionList';




export function SectionList<T extends UniqueData>({ sections, renderItem, renderSectionHeader, filterBy, filterValue, limit, list, reversed, searchBy, searchTerm, ...props }: SectionListProps<T>) {

    const sectionTitles = new Set<string>();
    sections.forEach((section) => {
        if (sectionTitles.has(section.title)) {
            throw new Error(`Duplicate section title found: ${section.title}`);
        }
        sectionTitles.add(section.title);
    });

    // Check if all data items have unique IDs
    sections.forEach((section, sectionIndex) => {
        section.data.forEach((item, itemIndex) => {
            if (!('id' in item)) {
                throw new Error(`Missing unique 'id' property in data at section ${sectionIndex}, item ${itemIndex}`);
            }
        });
    });

    const { sectionRenderList } = useSectionList<T>({ list: sections, filterBy, filterValue, limit, reversed, searchBy, searchTerm })


    return (
        <div {...props}>
            {sectionRenderList.map((section) => (
                <div key={section.title}>
                    {renderSectionHeader && renderSectionHeader(section)}
                    {section.data.map((item) => (
                        <div key={item.id}>{renderItem(item)}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

