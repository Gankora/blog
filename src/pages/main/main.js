import { useState, useEffect, useMemo } from 'react';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import styled from 'styled-components';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { posts, lastPage } }) => {
				setPosts(posts);
				setLastPage(lastPage);
				setIsLoading(false);
			},
		);
	}, [page, shouldSearch, searchPhrase]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	if (isLoading) {
		return null;
	}

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, comments }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={comments.length}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
				{lastPage > 1 && (
					<Pagination page={page} setPage={setPage} lastPage={lastPage} />
				)}
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	.post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	.no-posts-found {
		text-align: center;
		padding: 40px;
		font-size: 18px;
		font-weight: 400;
	}
`;
