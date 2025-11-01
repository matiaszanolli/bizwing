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
                    <div className="empty-state">
                        <p className="empty-icon">📰</p>
                        <p className="empty-title">No News Yet</p>
                        <p className="empty-hint">Start playing to receive updates about your airline's activities, achievements, and industry events.</p>
                    </div>
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
