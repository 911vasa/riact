import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './component/search_bar';
import VideoList from './component/video_list';
import VideoDetail from './component/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyB_v3IWlEc8XbOXl0M2uGaw4wT8x1Jb8ss';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {videos: [] , selectedVideo: null };
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term},  (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
        console.log(term);
    }

    render() {
        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));