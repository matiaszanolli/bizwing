// News log panel

import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { CONFIG } from '../../utils/config';

export function NewsPanel() {
    const { state } = useGame();
    const recentNews = state.newsLog.slice(-CONFIG.NEWS_DISPLAY_COUNT).reverse();

    return (
        <div className="panel news-panel">
            <h2>News</h2>
            <div className="news-list">
                {recentNews.length === 0 ? (
                    <p>No news yet</p>
                ) : (
                    recentNews.map((news, index) => (
                        <div key={index} className="news-item">
                            {news}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
