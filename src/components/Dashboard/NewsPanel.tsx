// News log panel

import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { CONFIG } from '../../utils/config';

// Categorize news based on content
function categorizeNews(newsText: string): { category: string; icon: string; color: string } {
    const lowerNews = newsText.toLowerCase();

    // Financial events
    if (lowerNews.includes('profit') || lowerNews.includes('revenue') || lowerNews.includes('cash') ||
        lowerNews.includes('$') || lowerNews.includes('paid') || lowerNews.includes('earned')) {
        return { category: 'financial', icon: '💰', color: '#00ff00' };
    }

    // Route/operational events
    if (lowerNews.includes('route') || lowerNews.includes('flight') || lowerNews.includes('suspended') ||
        lowerNews.includes('resumed') || lowerNews.includes('created')) {
        return { category: 'operational', icon: '✈', color: '#7fff00' };
    }

    // Fleet/aircraft events
    if (lowerNews.includes('aircraft') || lowerNews.includes('plane') || lowerNews.includes('purchased') ||
        lowerNews.includes('leased') || lowerNews.includes('sold')) {
        return { category: 'fleet', icon: '🛫', color: '#00aaff' };
    }

    // Market events
    if (lowerNews.includes('market') || lowerNews.includes('demand') || lowerNews.includes('passengers') ||
        lowerNews.includes('competitor')) {
        return { category: 'market', icon: '📊', color: '#ffaa00' };
    }

    // Reputation/achievement events
    if (lowerNews.includes('reputation') || lowerNews.includes('award') || lowerNews.includes('milestone')) {
        return { category: 'achievement', icon: '🏆', color: '#ffd700' };
    }

    // Negative/warning events
    if (lowerNews.includes('loss') || lowerNews.includes('problem') || lowerNews.includes('issue') ||
        lowerNews.includes('warning') || lowerNews.includes('decline')) {
        return { category: 'warning', icon: '⚠', color: '#ff5500' };
    }

    // Default - general info
    return { category: 'info', icon: '📢', color: '#00aaaa' };
}

export function NewsPanel() {
    const { state } = useGame();
    const recentNews = state.newsLog.slice(-CONFIG.NEWS_DISPLAY_COUNT).reverse();

    return (
        <div className="panel news-panel">
            <h2>News ({recentNews.length})</h2>
            <div className="news-list">
                {recentNews.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-icon">📰</p>
                        <p className="empty-title">No News Yet</p>
                        <p className="empty-hint">Start playing to receive updates about your airline's activities, achievements, and industry events.</p>
                    </div>
                ) : (
                    recentNews.map((news, index) => {
                        const { category, icon, color } = categorizeNews(news);

                        return (
                            <div key={index} className={`news-card news-${category}`}>
                                <div className="news-icon" style={{ color }}>
                                    {icon}
                                </div>
                                <div className="news-content">
                                    <div className="news-text">{news}</div>
                                    <div className="news-meta">
                                        <span className="news-category" style={{ color }}>
                                            {category.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
