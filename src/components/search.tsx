'use client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogFooter,
  SearchDialogOverlay,
  type SharedProps,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useState } from 'react';

function initOrama() {
  return create({
    schema: { _: 'string' },
    // https://docs.orama.com/docs/orama-js/supported-languages
    language: 'english',
  });
}

export default function DefaultSearchDialog(props: SharedProps) {
  
  const [tag, setTag] = useState<string | undefined>();
  const { locale } = useI18n(); // (optional) for i18n
  const { search, setSearch, query } = useDocsSearch({
    
    tag,
    type: 'static',
    initOrama,
    locale,
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      
        <SearchDialogFooter className="flex flex-row">
          <TagsList tag={tag} onTagChange={setTag}>
            <TagsListItem value="my-value">My Value</TagsListItem>
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}
